package banky.webservices.api.category.data;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public record CategoryResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    String name,
    int numberOfSubCategories
) {
}
