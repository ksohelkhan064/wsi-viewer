# WSI Viewer

## Overview

The WSI (Whole Slide Imaging) Viewer is a web application designed for visualizing and interacting with high-resolution digital pathology slides. This application allows users to zoom in and out of the slide, navigate through the image, and download reports containing detailed analysis of various blood cell types (RBCs, WBCs, and Platelets).

## Features

- **Dynamic Zooming**: Users can zoom in and out of the slide image, allowing for detailed examination of cellular structures.
- **Panning**: The viewer supports dragging to pan around the image when zoomed in, enabling users to navigate to different areas of the slide easily.
- **Data Visualization**: The application displays counts and percentages of different blood cell types in an organized manner.
- **Fullscreen Mode**: Users can toggle fullscreen mode for an immersive viewing experience.
- **Report Generation**: Users can download a PDF report summarizing patient information and blood cell data.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **jsPDF**: A library to generate PDF documents in client-side JavaScript.
- **jspdf-autotable**: A plugin for jsPDF that simplifies the process of generating tables in PDFs.
