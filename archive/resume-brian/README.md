#CSS 1 MODULE

Create a blank file called "style.css" and save it in your repo (make sure to save it in the "resume" folder where your index.html file should be saved). This is your external CSS stylesheet. 
Connect the stylesheet to your html document, using the appropriate code. 

Style the resume as follows:

Reference of what tags you should have used for each element:
Name: Heading 1
Title: Strong
Contact details (Email, LinkedIn, X, GitHub): Unordered list; your Email, LinkedIn, X, and GitHub should be linked to your profile on those sites.
Description: Paragraph tags
Section Titles (Experience, Education, Skills): Heading 2
Job Titles: Heading 3
Job Organization: Heading 4
Job Dates: Heading 5
Job Description: Paragraph tags
Education: Unordered list
Skills: Unordered list

The default font for the body (this will apply for all header, paragraph, list and list item elements) should be:
Open Sans, which is a Google Font 
1em in size
Dark gray (#444) in color
Google Fonts should already provide a generic font-family fallback (e.g., serif, sans-serif), but go ahead and add Arial as a fallback font. Remember, you should always end with a generic font-family fallback.

NAME: Your name should be:
3em in size
blue (#33485e) in color
Make it uppercase (using CSS)
You should also center your name on the page

YOUR TITLE: Your title should be:
all uppercase
1.5em in size
blue (#33485e) in color

SECTION TITLES: The section titles should be:
1.5em in size
all uppercase (use CSS to accomplish this)
They should have a blue background color (#33485e) and the text should be white.
The text boldness should be 400.

JOB TITLES: Should have a boldness level of 600. Set font-size to 1.5em.

JOB ORGANIZATION: Should have a boldness level of 400 and italicize (using a CSS property) and set font-size to 1.5em.

#CSS 2 MODULE

From GitHub Desktop: If you're on a new computer, clone GitHub pages repo to your desktop. If you're on the same computer, sync (i.e., in your GitHub desktop app, click "Fetch Origin" to pull your latest code into your local repo).

Open your resume document (index.html) from your repo in your preferred code editor (e.g., VSCode) on one side of the screen. This is the same HTML file you've been working in! You're not creating a new one, just editing your existing HTML file. REMINDER: In your local repo (Documents > GitHub > firstname-lastname-jour652 repo), you should have a "resume" folder created. Your index.html file should already be saved inside that folder, along with your external stylesheet (style.css).

Open your resume index.html in Google Chrome on the other side of the screen. When you make changes in index.html in your code editor, refresh index.html in Chrome to see changes. This is critical. Get into the habit of making a single change, and refreshing in the browser to check it. That way, you can quickly troubleshoot and pinpoint the issue if something isn't working.

Periodically commit changes on GitHub Desktop and sync to main [two steps needed to commit changes: 1 - write a summary (e.g., updated index) & commit to main; 2 - push origin] so that your updated code lives in the cloud on github.com.

Detailed instructions

Pay close attention to the following guidelines:

Your main goals include:

Add a container DIV around our document.
Replace all of the heading tags with DIVs.
Add classes and IDs to existing elements so that you can target them from your stylesheet.
Add styles to those targeted elements.
Use the correct name for CSS properties. Don't forget any hyphens! (e.g., font size should be font-size)

General rules:
Use proper indentation and whitespace.
As you build this page, make at least 3 commits and syncs to your repo on GitHub.

Detailed instructions:
1. Add a div around everything in the body with the id "container" in your html document. Add the container ID near the top of your stylesheet (under body). Don't forget the closing div tag! 

Give it a width of 100%
Set a maximum width of 1200 pixels
Center the div by giving it a margin of "0 auto"
Add 50 pixels of padding to the bottom

2. Change the Heading 1 tags in your html document AND external stylesheet to a div with an ID of "name". Maintain the existing styling, while adding the following:

A solid bottom border set to 1 pixel with a color of #33485e.
Set the width at 60 percent.
Set the minimum width at 300 pixels.
Set the margin to "0 auto"

3. Change the Heading 2 tags in your html document AND external stylesheet to a div with a class of "sectionheader". Maintain the existing styling, while adding the following:

A margin of 20 pixels on the top, 10 pixels on the bottom, and 0 on all other sides. Optional: You can use margin shorthand.
Set padding at the top and bottom at 5 pixels, at the right 0, and at the left 10 pixels.
Set the width at 100 percent.
Set the minimum width at 300 pixels.

4. Change the Heading 3 tags in your html document and stylesheet to a div with a class of "jobtitle". Leave the styling as is.

5. Change the Heading 4 tags in your html document and stylesheet to a div with a class of "organization". Maintain the existing styling, while changing the following style:

Change font size to 1.2em

6. Change the Heading 5 tags in your html document and stylesheet to a div with a class of "date". Leave the styling as is, but add the following:

Set the margin at the top to 2 pixels, while setting all other margins to 0 pixels.

7. Add a class of "description" to all of the paragraph elements on the page. Add the following style to your stylesheet using the class as the selector:

Set the margin at the top and bottom to 10 pixels, while setting all other margins to 0.

8. Add a class of "menu" to the unordered list containing your contact information. (HINT: Use CSS chaining to target the specific list.) In your stylesheet:

Set the margin at the top to 10 pixels, at the bottom to 20 pixels, while setting all other margins to 0.
Set padding for this list on all sides to 0px (you may use one value to do this).
Align the text center.

9. Next, target the list items in the "menu" list (HINT: not the entire list, but the list items --> you should have learned this in the "Descendant Combinator" portion of the "Selectors" lesson in Codecademy), and add the following styles:

Set those items to display inline.
Set padding at the top and bottom to 0, and at the left and right to 20 pixels.

10. Add an id of "degrees" to the unordered list in the education section. In your stylesheet, add the following styles:

Set the top margin to 5 pixels, while leaving all the other sides at 0.

11. Add an id of "do" to the unordered list in the skills section. In your stylesheet, add the following styles:

Set the top margin to 5 pixels, while leaving all the other sides at 0.

12. Change the <strong> tag around your title (in the body, not to be confused with the title element in the head) to a div with an id of "title" in both your index and stylesheet. Add the following styles:

Font weight of 600 
Align the text center.
A top margin of 20 pixels and 0 on all other sides.

13. Move your headshot image to below your "menu" unordered list. Give the image an id of "headshot" and delete the 300px width from the html tag. In your stylesheet, add the following styles:

A width and height of 150 pixels.
Set the object-fit to cover (this will look like this: object-fit: cover;)
Set border-radius to 50%
Give your image a solid border that's 5 pixels and the color #33485e

14. Add a div around your headshot image. Give it a id of "headshot-container". Add the following style:

Align the text center.

15. Let's add some spacing between your jobs in the Experience. Add a line break in your html document using the correct HTML tag after each paragraph with the "description" class, EXCEPT after your last paragraph.

16. Finally, let's change the styles for the links. Add 3 CSS declarations for the following pseudo classes for the anchor links.

Add the following styles for a:link (unvisited link) >> set font weight to 600 and color to #0bc5f4
Add the following styles for a:hover (when you mouse over the link) >> set color to #33485e
Add the following styles for a:visited (visited link) >> set color to #6e38c7

17. In your HTML document and stylesheet, use proper indentation and spacing.

18. Reminder: As you build this page, make at least 3 commits and syncs to your repo on GitHub.

19. LAST STEP: Submit your GitHub link in ELMS by 11:59 p.m. ET, Oct. 4!

JOB DATES: Should have a boldness level of 700 and set font-size to 1em.

CONTACT INFO, SKILLS, EDUCATION: The items in these lists should be 1em in font-size.
