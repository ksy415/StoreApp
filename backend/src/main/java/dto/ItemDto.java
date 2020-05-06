package dto;

public class ItemDto {

    public final String name;
    public final double price;

    public ItemDto(String name, String price) {

        this.price = Double.parseDouble(price);
        this.name = name;
}
}
