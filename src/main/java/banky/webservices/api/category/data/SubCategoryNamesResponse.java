package banky.webservices.api.category.data;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public record SubCategoryNamesResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    @JsonSerialize(using = ToStringSerializer.class)
    Long categoryId,
    String name
) {
}
