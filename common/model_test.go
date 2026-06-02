package common

import (
	"testing"

	"github.com/QuantumNous/new-api/constant"
)

func TestGPTImage2UsesImageGenerationEndpoint(t *testing.T) {
	model := "gpt-image-2"

	if !IsImageGenerationModel(model) {
		t.Fatalf("%s should be recognized as an image generation model", model)
	}

	endpointTypes := GetEndpointTypesByChannelType(constant.ChannelTypeOpenAI, model)
	if len(endpointTypes) == 0 {
		t.Fatal("expected at least one endpoint type")
	}
	if endpointTypes[0] != constant.EndpointTypeImageGeneration {
		t.Fatalf("expected first endpoint type %q, got %q", constant.EndpointTypeImageGeneration, endpointTypes[0])
	}
}
