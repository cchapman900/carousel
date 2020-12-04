# Carousel Component Editor
For this coding challenge, we would like you to prototype a kind of carousel editor. This should consist of a page of 3 components.

## Components
### Image Selector
This will display a set of images based on a json data. The images should be displayed as 100 x 100 images in rows that wrap with their caption displayed below the image. They should be displayed in alphabetical order based on their caption.

You can toggle select one or more of these images. Selected images should have a blue border around them. There should be an “Add” button that is initially disabled. When one or more images are selected there will be an “Add” button that will become enabled (should be disabled if none are selected). Clicking the Add button adds the selected images to the carousel. Added images should no longer appear in this display. Each time you add images, the carousel updates to reflect it.

### Carousel
This will be a carousel containing the selected images from above (initially empty).
The carousel should be configurable to show between 2 to 5 items at a time based on a drop down menu containing these options.

Carousel images should also be displayed in alphabetical order.

Whenever new images are added or carousel configuration changes, carousel will refresh itself.

There should be a previous and next button that when clicked cycle to the next or previous set of images. (so if it’s configured to show 3 images at a time. It will initially display image 1, 2, 3 and clicking next will display 4, 5, 6). If you’re at the beginning of the carousel, previous button should be disabled. If at the end, next button should be disabled. (We should see an enabled and disabled state).

Carousel has a view mode and edit mode controlled by “view/edit” toggle button.

In view mode, rolling over an image will display it’s caption within the image centered at the bottom,
In edit mode, images are selectable just like in the image selector. Similar to the “Add” button in the image selector, a “Delete” button will become viewable in edit mode. It is in a disabled state until one or more images are selected. Clicking the Delete button will remove those images from the carousel. If items are selected and you toggle back to view mode before deleting, those items become unselected. You may need to scroll through the carousel to select multiple items.

Deleting images will add them back to Image Selector view.

Carousel should occupy a fixed width no matter how many images it’s configured to display at once. So if carousel area is 500 pixels wide, then a 5 image carousel should have each image as 100 x 100. A 2 image carousel should have each image as 250 x 250.

### Image Viewer
Below the carousel is an image viewer. When the above carousel is in view mode, and the user clicks on one of the images, this image will be displayed as a 500 x 500 image in the viewer with the caption below it.

## Requirements

### Minimum requirements.
- For the last set of images in the carousel, if there are fewer images than slots available those slots can be blank
- No transitions needed between sets of carousel items
- No dots needed below carousel to indicate how many different sets there are.

### Bonus points.
- For the last set of images in the carousel, if there are fewer images than slots available and more than one set of images, the last image should occupy the last slot. So if you have 8 slides and are showing 5 slides per view, then instead of just showing slides 6, 7 and 8, it should show slides 4, 5, 6, 7, and 8
- Show a sliding transition when clicking next/previous buttons
- Show dots below carousel indicating how many different sets there are.
