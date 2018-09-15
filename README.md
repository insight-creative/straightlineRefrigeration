# Straightline Refrigeration website :poop:

This is a Jekyll site for Straightline Refrigeration

# Getting started

<i class="fa fa-gear fa-spin fa-2x" style="color: firebrick"></i> Configuration

# Basic File Structure

## Pages

Each individual page will be located inside the folder with its corresponding name.

## Images

Images are stored in the \_img folder

## Site

The \_site directory is the compiled directory with all of the final files. The contents of this folder is what will be uploaded to the actual website.

## Styles

Do not make style changes in the css directory. The styles for the website are all in the \_scss directory. Each individual page has had its own style sheet setup for styles unique to that page, and then there are sheets setup for general styling like the footer or typography. The \_variables.scss sheet has site wide variables that can be used in your scss sheets.

# Usage

## Writing to your SCSS file

sass --watch \_scss/main.scss:css/main.css
