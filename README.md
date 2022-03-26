# Company Organizer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br>

## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Technologies Used](#technologies-used)
* [Questions](#questions)
* [License](#license)
    

## Description 

- **What was your motivation?** To create a persistent company organizer to keep track of employees, their roles, departments, salaries and managers.
- **Why did you build this project?** To handle database storage for any company that wants to organize their employee data.
- **What problem does it solve?** Having to keep track of all of the info for company employees by hand or in a document.
- **What did you learn?** I leanred a lot about how to use databases effectively and how to further use iquirer.

## Installation

1. Clone repository
2. Open the `index.js` file
3. On line 13 update your "mySQL" password
4. Open Terminal under root folder, so on index.js
5. Enter `mysql -u root -p`, then enter your password.
6. Now only run `source db/schema.sql` and then run `source db/seeds.sql` only if you want some preloaded data
7. If you did not use some preloaded data, then you will need to first `add departments` manually, then `add roles`, then `add employees`.
8. Now enter `quit` to get back to root folder
9. Run `npm i`
10. Enter `node index`


## Usage

Video Walkthrough: https://drive.google.com/file/d/14oi7m4m6zXFFYzJ6E9K1jisigQNdG_Jg/view



Include screenshots as needed.

## Credits
Ross McWey

## Technologies Used
JavaScript, node.js, mysql, mysql2 package, console.table package, iquirer package, press-any-key package, and ascii-art package.


## Questions
My Github page: https://github.com/RMcwey
<br>
For any questions please contact me at rmcwey@hotmail.com

## License 
<br>
MIT
<br>
Copyright (c) [2022] [Ross McWey]

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    
