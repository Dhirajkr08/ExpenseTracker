# Expense Tracker

[Visit the site](https://dhirajkr08.github.io/ExpenseTracker/)

## Overview

The Expense Tracker is a web application that allows users to manage their expenses efficiently. Users can add, edit, and delete expenses, categorize them, and view a summary of their total expenses. The application uses a RESTful API for data storage and provides a user-friendly interface built with HTML, CSS, and JavaScript.

## Features

- **Add Expense**: Users can input the name, price, and category of an expense.
- **Edit Expense**: Users can modify existing expenses, including changing the name, price, and category.
- **Delete Expense**: Users can remove expenses from the list.
- **View Total Expenses**: The application calculates and displays the total amount of expenses.
- **Categorization**: Expenses can be categorized into Food/Beverage, Travel/Commute, and Shopping.
- **Responsive Design**: The application is designed to be responsive, ensuring a good user experience on both desktop and mobile devices.
- **Data Persistence**: Expenses are stored using a RESTful API, ensuring that data persists even after refreshing the page.

## Technologies Used

- **HTML**: For structuring the web application.
- **CSS**: For styling the application, using Tailwind CSS for responsive design.
- **JavaScript**: For client-side logic and interaction.
- **Axios**: For making HTTP requests to the RESTful API.
- **RESTful API**: CRUD operations are performed using the [CrudCrud](https://crudcrud.com/) API for data storage.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Internet connection (for accessing the API)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Open the `index.html` file** in your web browser.

### Usage

1. **Adding an Expense**:
   - Fill in the expense name, price, and select a category from the dropdown.
   - Click the "Add Expense" button to add the expense to the list.

2. **Editing an Expense**:
   - Click the edit button (✎) next to the expense you want to modify.
   - Update the expense details and click the "Add Expense" button to save the changes.

3. **Deleting an Expense**:
   - Click the delete button (X) next to the expense you want to remove.

4. **Viewing Total Expenses**:
   - The total amount of expenses is displayed at the top of the application.

## API Endpoints

- **Create Expense**: `POST https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker`
- **Read Expenses**: `GET https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker`
- **Update Expense**: `PUT https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker/{id}`
- **Delete Expense**: `DELETE https://crudcrud.com/api/fb990756475e4ecc9097eee9d5187f4b/eTracker/{id}`

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the Apache-2.0 License - see the [Apache-2.0](LICENSE) file for details.

## Acknowledgments

- Thanks to [CrudCrud](https://crudcrud.com/) for providing a simple API for data storage.
- Thanks to the open-source community for the tools and libraries used in this project.
