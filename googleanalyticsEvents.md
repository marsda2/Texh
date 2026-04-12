# Recommended events

Google Analytics [sends some event types
automatically](https://support.google.com/analytics/answer/9234069). This page
describes optional, additional events you can configure to measure more
behaviors and generate more useful reports for your business. These additional
events take more effort to configure before you can use them, so Google
Analytics 4 can't send them automatically. For step-by-step instructions on how
to configure recommended and custom events for your website or app, see [Set up
events](https://developers.google.com/analytics/devguides/collection/ga4/events).

To view details of each event you can use, select your tag management platform:

<button value="gtag" default="">gtag.js</button> <button value="gtm">Tag Manager</button> <button value="firebase">Firebase</button>

## For all properties

### `earn_virtual_currency`

This event measures when a user is awarded virtual currency in a game.
Log this along with [spend_virtual_currency](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#spend_virtual_currency) to better understand your
virtual economy.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `virtual_currency_name` | `string` | No | Gems | The name of the virtual currency. |
| `value` | `number` | No | 5 | The value of the virtual currency. |

### `join_group`

Log this event when a user joins a group such as a guild, team, or family. Use
this event to analyze how popular certain groups or social features are.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `group_id` | `string` | No | G_12345 | The ID of the group. |

### `login`

Send this event to signify that a user has logged in to your website or app.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `method` | `string` | No | Google | The method used to login. |

### `search`

Log this event to indicate when the user has performed a search. You can use
this event to identify what users are searching for on your website or app. For
example, you could send this event when a user views a search results page after
performing a search.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `search_term` | `string` | **Yes** | t-shirts | The term that was searched for. |

### `select_content`

This event signifies that a user has selected some content of a certain type.
This event can help you identify popular content and categories of content on
your website or app.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `content_type` | `string` | No | product | The type of selected content. |
| `content_id` | `string` | No | C_12345 | An identifier for the content that was selected. |

### `share`

Use this event when a user has shared content.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `method` | `string` | No | Twitter | The method in which the content is shared. |
| `content_type` | `string` | No | image | The type of shared content. |
| `item_id` | `string` | No | C_12345 | The ID of the shared content. |

### `sign_up`

This event indicates that a user has signed up for an account. Use this event to
understand the different behaviors of logged in and logged out users.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `method` | `string` | No | Google | The method used for sign up. |

### `spend_virtual_currency`

This event measures the sale of virtual goods in your app and helps you identify
which virtual goods are the most popular.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `value` | `number` | **Yes** | 5 | The value of the virtual currency. |
| `virtual_currency_name` | `string` | **Yes** | Gems | The name of the virtual currency. |
| `item_name` | `string` | No | Starter Boost | The name of the item the virtual currency is being used for. |

### `tutorial_begin`

This event signifies the start of the on-boarding process. Use this in a funnel
with [tutorial_complete](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#tutorial_complete) to understand how many users complete the tutorial.

#### Parameters

There are no parameters for this event.

### `tutorial_complete`

This event signifies the user's completion of your on-boarding process. Use this
in a funnel with [tutorial_begin](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#tutorial_begin) to understand how many users complete the
tutorial.

#### Parameters

No parameters are suggested for this event.

## Online sales

### `add_payment_info`

This event signifies a user has submitted their payment information in an
ecommerce checkout process.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the event. <br /> Event-level and item-level `coupon` parameters are independent. |
| `payment_type` | `string` | No | Credit Card | The chosen method of payment. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `add_shipping_info`

This event signifies a user has submitted their shipping information in an
ecommerce checkout process.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the event. <br /> Event-level and item-level `coupon` parameters are independent. |
| `shipping_tier` | `string` | No | Ground | The shipping tier (e.g. `Ground`, `Air`, `Next-day`) selected for delivery of the purchased item. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `add_to_cart`

This event signifies that an item was added to a cart for purchase.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `add_to_wishlist`

The event signifies that an item was added to a wishlist. Use this event to
identify popular gift items in your app.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `begin_checkout`

This event signifies that a user has begun a checkout.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the event. <br /> Event-level and item-level `coupon` parameters are independent. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `purchase`

This event signifies when one or more items is purchased by a user.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `customer_type` | `string` (`new` / `returning`) | No | new | Is the conversion from a \`new\` or \`returning\` customer? - `new`: New customer who hasn't purchased within a given time period (540-day window recommended and set at default, but not required). - `returning`: A returning customer who has purchased during the given time period. <br /> Don't specify a value if there's uncertainty (for example, if the user checked out as a guest). |
| `transaction_id` | `string` | **Yes** | T_12345 | The unique identifier of a transaction. <br /> The `transaction_id` parameter helps you avoid getting duplicate events for a purchase. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the event. <br /> Event-level and item-level `coupon` parameters are independent. |
| `shipping` | `number` | No | 3.33 | Shipping cost associated with a transaction. |
| `tax` | `number` | No | 1.11 | Tax cost associated with a transaction. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `refund`

This event signifies when one or more items is refunded to a user.

> [!NOTE]
> **Note:** We recommend that you include item information in your `refund` event to see item-level refund metrics in Analytics.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `transaction_id` | `string` | **Yes** | T_12345 | The unique identifier of a transaction. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the event. <br /> Event-level and item-level `coupon` parameters are independent. |
| `shipping` | `number` | No | 3.33 | Shipping cost associated with a transaction. |
| `tax` | `number` | No | 1.11 | Tax cost associated with a transaction. |
| `items` | ` https://developers.google.com/analytics/devguides/collection/ga4/reference/refund_item ` | No\* |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `remove_from_cart`

This event signifies that an item was removed from a cart.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `select_item`

This event signifies an item was selected from a list.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> Ignored if set at the item-level. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> Ignored if set at the item-level. |
| `items` | `https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item_item` | **Yes\*** |   | The items for the event. <br /> \* The `items` array is expected to have a single element, representing the selected item. If multiple elements are provided, only the first element in `items` will be used. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `select_promotion`

This event signifies a promotion was selected from a list.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `creative_name` | `string` | No | summer_banner2 | The name of the promotional creative. <br /> Ignored if set at the item-level. |
| `creative_slot` | `string` | No | featured_app_1 | The name of the promotional creative slot associated with the event. <br /> Ignored if set at the item-level. |
| `promotion_id` | `string` | No | P_12345 | The ID of the promotion associated with the event. <br /> Ignored if set at the item-level. |
| `promotion_name` | `string` | No | Summer Sale | The name of the promotion associated with the event. <br /> Ignored if set at the item-level. |
| `items` | ` https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_promotion_item` | No |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `creative_name` | `string` | No | summer_banner2 | The name of the promotional creative. <br /> If set, event-level `creative_name` is ignored. If not set, event-level `creative_name` is used, if present. |
| `creative_slot` | `string` | No | featured_app_1 | The name of the promotional creative slot associated with the item. <br /> If set, event-level `creative_slot` is ignored. If not set, event-level `creative_slot` is used, if present. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `promotion_id` | `string` | No | P_12345 | The ID of the promotion associated with the item. <br /> If set, event-level `promotion_id` is ignored. If not set, event-level `promotion_id` is used, if present. |
| `promotion_name` | `string` | No | Summer Sale | The name of the promotion associated with the item. <br /> If set, event-level `promotion_name` is ignored. If not set, event-level `promotion_name` is used, if present. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `view_cart`

This event signifies that a user viewed their cart.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `view_item`

This event signifies that some content was shown to the user. Use this event to
discover the most popular items viewed.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

<br />

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `view_item_list`

Log this event when the user has been presented with a list of items of a
certain category.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> Ignored if set at the item-level. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> Ignored if set at the item-level. |
| `items` | `Array<Item>` | **Yes** |   | The items for the event. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

### `view_promotion`

This event signifies a promotion was viewed from a list.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `creative_name` | `string` | No | summer_banner2 | The name of the promotional creative. <br /> Ignored if set at the item-level. |
| `creative_slot` | `string` | No | featured_app_1 | The name of the promotional creative slot associated with the event. <br /> Ignored if set at the item-level. |
| `promotion_id` | `string` | No | P_12345 | The ID of the promotion associated with the event. <br /> Ignored if set at the item-level. |
| `promotion_name` | `string` | No | Summer Sale | The name of the promotion associated with the event. <br /> Ignored if set at the item-level. |
| `items` | `https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_promotion_item` | **Yes\*** |   | The items for the event. <br /> \* The `items` array is expected to have a single element, representing the item associated with the promotion. If multiple elements are provided, only the first element in `items` will be used. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | **Yes\*** | SKU_12345 | The ID of the item. \*One of `item_id` or `item_name` is required. |
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `creative_name` | `string` | No | summer_banner2 | The name of the promotional creative. <br /> If set, event-level `creative_name` is ignored. If not set, event-level `creative_name` is used, if present. |
| `creative_slot` | `string` | No | featured_app_1 | The name of the promotional creative slot associated with the item. <br /> If set, event-level `creative_slot` is ignored. If not set, event-level `creative_slot` is used, if present. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price` | `number` | No | 10.01 | The monetary unit price of the item, in units of the specified currency parameter. <br /> If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter. |
| `promotion_id` | `string` | No | P_12345 | The ID of the promotion associated with the item. <br /> If set, event-level `promotion_id` is ignored. If not set, event-level `promotion_id` is used, if present. |
| `promotion_name` | `string` | No | Summer Sale | The name of the promotion associated with the item. <br /> If set, event-level `promotion_name` is ignored. If not set, event-level `promotion_name` is used, if present. |
| `quantity` | `number` | No | 3 | Item quantity. <br /> If not set, `quantity` is set to 1. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

## Games

### `level_end`

This event signifies that a player has reached the end of a level in a game.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `level_name` | `string` | No | The journey begins... | The name of the level. |
| `success` | `boolean` | No | true | Set to `true` if the level was completed successfully. |

### `level_start`

This event signifies that a player has started a level in a game.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `level_name` | `string` | No | The journey begins... | The name of the level. |

### `level_up`

This event signifies that a player has leveled up in a game. Use it to gauge the
level distribution of your user base and identify levels that are difficult to
complete.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `level` | `number` | No | 5 | The level of the character. |
| `character` | `string` | No | Player 1 | The character that leveled up. |

### `post_score`

Send this event when the user posts a score. Use this event to understand how
users are performing in your game and correlate high scores with audiences or
behaviors.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `score` | `number` | **Yes** | 10000 | The score to post. |
| `level` | `number` | No | 5 | The level for the score. |
| `character` | `string` | No | Player 1 | The character that achieved the score. |

### `unlock_achievement`

Log this event when the user has unlocked an achievement. This event can help
you understand how users are experiencing your game.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `achievement_id` | `string` | **Yes** | A_12345 | The id of the achievement that was unlocked. |

## Lead generation

### `close_convert_lead`

This event measures when a lead has been converted and closed (for example,
through a purchase).

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |

### `close_unconvert_lead`

This event measures when a user is marked as not becoming a converted lead,
along with the reason.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `unconvert_lead_reason` | `string` | No | Never responded | The reason the lead was unconverted. |

### `disqualify_lead`

This event measures when a user is marked as disqualified to become a lead,
along with the reason for the disqualification.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `disqualified_lead_reason` | `string` | No | Not looking to buy | The reason a lead was marked as disqualified. |

### `generate_lead`

This event measures when a lead has been generated (for example, through a
form). Log this to understand the effectiveness of your marketing campaigns and
how many customers re-engage with your business after remarketing to the
customers.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `lead_source` | `string` | No | Trade show | The source of the lead. |

### `qualify_lead`

This event measures when a user is marked as meeting the criteria to become a
qualified lead.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |

### `working_lead`

This event measures when a user contacts or is contacted by a representative.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `lead_status` | `string` | No | Started conversations | The status of the lead. |