package banky.webservices.api.accounts.data;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public record AccountNamesResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    String name
) {
}
