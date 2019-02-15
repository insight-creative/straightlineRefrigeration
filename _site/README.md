# :snowman: Straightline Refrigeration website

This is a Jekyll site for Straightline Refrigeration :octocat:

# :metal: Getting started

# :open_file_folder: Basic File Structure

## :page_with_curl: Pages

Each individual page will be located inside the folder with its corresponding name. Your homepage lives in the root of your site at index.html

## :camera: Images

Images are stored in the \_img folder

## :computer: Site

The \_site directory is the compiled directory with all of the final files. The contents of this folder is what will be uploaded to the actual website.

## :dancer: Styles

Do not make style changes in the css directory. The styles for the website are all in the \_scss directory. Each individual page has had its own style sheet setup for styles unique to that page, and then there are sheets setup for general styling like the footer or typography. The \_variables.scss sheet has site wide variables that can be used in your scss sheets.

## \_scss folder

### Variables

Variables folder contains our sites variables, mostly color variables for styles throughout the sites

### Breakpoints

This file contains my breakpoints for mobile styling

### Layout

Contains all the styles used for layouts, columns, images, text blocks etc...

### Header

Styling for the sites header/navigation

### Footer

Styling for the sites Footer

### Typography

Typography settings for headers paragraphs etc ...

### Buttons

Styling for our sites buttons and links

### General

Holds any styles that are general or consistent with all pages throughout the site

### Icons

Styling for any icons the site might use

### Individual Pages

Each individual pages custom styles are held in the scss file with the corresponding page name ex. home = home.scss

## :milky_way: JavaScript

The js folder holds all your JavaScript files, here you will find JavaScript for barba.js and our sites custom JavaScript

# :eyes: Usage

## :black_nib: Writing to your SCSS file

sass --watch \_scss/main.scss:css/main.css

## :runner: Runnin local Jekyll build

Builds your site any time a source file changes and serves it locally at https://127.0.0.1:4000

## Add a project

## :computer: Deploying to Testing Site/Live Site

Live site/testing site is hosted on Cloudways

  1. Log into Cloudways dashboard and find your application

  2. Open FTP and find the appropriate application.

  3. Copy all files from your \_site folder into your public_html folder
