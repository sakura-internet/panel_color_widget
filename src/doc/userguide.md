Panel widget
============

The panel widget is a WireCloud widget that provides an easy way to display simple text messages, like measures.

## Settings

- `Min height (Percentage)`: Minimal font-size to use. This value is a percentage relative to the available height.
- `Max height (Percentage)`: Maximal font-size to use. This value is a percentage relative to the available height.
- `Decimals`: Number of decimals to use for number values. Empty for using all the available decimals.

## Wiring

### Input Endpoints

- **Contents**: An object with the message to display. The message should be provided using the `value` key. E.g.
    ```json
    {
        "value": "Text message"
    }
    ```

    You can also provide a unit:

    ```json
    {
        "value": "24.5",
        "unit": "ºC"
    }
    ```

### Output Endpoints

- This widget has no output endpoint

