package dto;

public class ResponseDto {
    public final boolean success;

    public ResponseDto(boolean success, String error) {
        this.success = success;
        this.error = error;
    }

    public final String error;
}
