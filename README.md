# Kiwi Art House
>
> Project Description

I redesigned the ‘Kiwi Art House Gallery’ website with WordPress and React. I implemented customisable features that allow for the adjustment of the background colour of the header and buttons. This flexibility enables simple changes to the website’s colour palette. 

> Key Features

- Custom data fields
- WooCommerce product management
- Contact Form
- customisation functionality(font, colour)

> Code Snippet

To enable customization functionality, register and establish customizer settings, then incorporate a corresponding control for it.
```php
// Register and define customizer settings here
      $wp_customize->add_setting('background_color', array(
        'default' => '#ffffff', // Default background color
        'transport' => 'postMessage',
      ));
      
      // Add a control for the background color
      $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'background_color', array(
        'label' => __('Background Color', 'custom-theme'),
        'section' => 'colors',
      )));
```

Then create useCusomiser hook, and get the data from the custom Rest API.
All pages are effectively affected by importing the hook

```javascript
useEffect(() => {
        axios.get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
        .then((res) => {
            const {backgroundColor, mainColor ,sectionBgColor, fontFamily} = res.data
            setBgColor(backgroundColor)
            setMainColor(mainColor)
            setSectionBgColor(sectionBgColor)
            setFont(fontFamily)
        })
        .catch((err) => console.error('Error fetching customizer setting:',err))
    }, [baseUrl])

  return (
    {bgColor, mainColor ,sectionBgColor, font}
  )
```

> Project Mockups

