package relayconvert

import (
	"context"
	"encoding/base64"
	"testing"

	"github.com/QuantumNous/new-api/relaykit/dto"
	"github.com/QuantumNous/new-api/relaykit/relayconvert/convmeta"
	"github.com/stretchr/testify/require"
)

func claudeTestMaxTokens() *uint {
	value := uint(128)
	return &value
}

func claudeFileRequest(file *dto.MessageFile) dto.GeneralOpenAIRequest {
	message := dto.Message{Role: "user"}
	fileMap := map[string]any{
		"filename":  file.FileName,
		"file_data": file.FileData,
	}
	if file.FileId != "" {
		fileMap["file_id"] = file.FileId
	}
	message.Content = []any{map[string]any{
		"type": dto.ContentTypeFile,
		"file": fileMap,
	}}
	return dto.GeneralOpenAIRequest{
		Model:     "claude-test",
		MaxTokens: claudeTestMaxTokens(),
		Messages:  []dto.Message{message},
	}
}

func TestOpenAIChatRequestToClaudeMessagesTextFile(t *testing.T) {
	data := base64.StdEncoding.EncodeToString([]byte("hello from a text file"))
	request := claudeFileRequest(&dto.MessageFile{FileName: "note.txt", FileData: data})

	got, err := OpenAIChatRequestToClaudeMessages(context.Background(), &convmeta.Values{}, request)
	require.NoError(t, err)
	content, ok := got.Messages[0].Content.([]dto.ClaudeMediaMessage)
	require.True(t, ok)
	require.Len(t, content, 1)
	require.Equal(t, "text", content[0].Type)
	require.Equal(t, "hello from a text file", *content[0].Text)
}

func TestOpenAIChatRequestToClaudeMessagesPDFFile(t *testing.T) {
	data := base64.StdEncoding.EncodeToString([]byte("pdf bytes"))
	request := claudeFileRequest(&dto.MessageFile{FileName: "document.pdf", FileData: data})

	got, err := OpenAIChatRequestToClaudeMessages(context.Background(), &convmeta.Values{}, request)
	require.NoError(t, err)
	content, ok := got.Messages[0].Content.([]dto.ClaudeMediaMessage)
	require.True(t, ok)
	require.Len(t, content, 1)
	require.Equal(t, "document", content[0].Type)
	require.Equal(t, "application/pdf", content[0].Source.MediaType)
	require.Equal(t, data, content[0].Source.Data)
}

func TestOpenAIChatRequestToClaudeMessagesRejectsUnsupportedFile(t *testing.T) {
	request := claudeFileRequest(&dto.MessageFile{FileName: "archive.zip", FileData: "ZmFrZQ=="})

	_, err := OpenAIChatRequestToClaudeMessages(context.Background(), &convmeta.Values{}, request)
	require.ErrorContains(t, err, "unsupported claude file mime type application/zip for archive.zip")
}

func TestOpenAIChatRequestToClaudeMessagesSupportsOpus48Effort(t *testing.T) {
	for _, model := range []string{"claude-opus-4-8-high", "claude-opus-4-8-thinking"} {
		t.Run(model, func(t *testing.T) {
			meta := &convmeta.Values{}
			meta.Options = &convmeta.Options{
				Claude: convmeta.ClaudeOptions{
					ThinkingAdapterEnabled:                true,
					ThinkingAdapterBudgetTokensPercentage: 0.8,
				},
			}
			request := dto.GeneralOpenAIRequest{
				Model:       model,
				MaxTokens:   claudeTestMaxTokens(),
				Temperature: func() *float64 { value := 0.7; return &value }(),
				TopP:        func() *float64 { value := 0.9; return &value }(),
				TopK:        func() *int { value := 40; return &value }(),
				Messages:    []dto.Message{{Role: "user", Content: "hello"}},
			}

			got, err := OpenAIChatRequestToClaudeMessages(context.Background(), meta, request)
			require.NoError(t, err)
			require.Equal(t, "claude-opus-4-8", got.Model)
			require.NotNil(t, got.Thinking)
			require.Equal(t, "adaptive", got.Thinking.Type)
			require.Equal(t, "summarized", got.Thinking.Display)
			require.JSONEq(t, `{"effort":"high"}`, string(got.OutputConfig))
			require.Nil(t, got.Temperature)
			require.Nil(t, got.TopP)
			require.Nil(t, got.TopK)
		})
	}
}
