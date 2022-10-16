<!--
 Copyright (C) 2022 RDS Ventures LLC
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

# WordPress Block Plugin Starter Kit

This is a starter kit for creating a WordPress block plugin. It is based on @wordpress/create-block and includes the following features:

-   ESNext JavaScript
-   JSX syntax
-   TailwindCSS for styles
-   Webpack build process
-   SWC for faster builds
-   ESLint for code linting
-   Prettier for code formatting

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/)


## Getting Started

1.  Clone this repository
2.  Update the proxy.URL.target in `webpack.config.js` to match your local WordPress installation
2.  Run `yarn`
3.  Run `yarn dev` to start the build process and watch for changes