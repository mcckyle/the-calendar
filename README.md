# The Calendar

The **Calendar** is a React-based calendar, with the aim of providing an intuitive and accessible way for the Saint Louis community to explore local events. This project enables community members to easily view events for a specific week, navigate between week, and display event detailss. Built using modern technologies like React and Vite.

> **Note**: This is a work-in-progress, and new features and enhancements are continuously being added!

## Features

- **Interactive Calendar**: View and interact with a calendar of the current week.
- **Week Navigation**: Seamlessly navigate between weeks using intuitive buttons.
- **Event Display**: View events for specific days and see event markers on days with scheduled activities.
- **Responsive Design**: The calendar adapts to different screen sizes using CSS Grid and Flexbox for a smooth user experience across devices.
- **Event Management**: Events are displayed dynamically using a dedicated backend API, which automatically adds new events from throughout the area.
  
## Technologies Used

- **React**: For building a dynamic and responsive user interface using functional components and React hooks.
- **Vite**: A modern, fast build tool and development server that optimizes performance for React apps.
- **CSS Grid & Flexbox**: For responsive layout design, ensuring the calendar looks great on all devices.
- **Ticketmaster API**: Events data is fetched from an API, allowing automatic updates and management of events.

## Screenshots

![Calendar Screenshot](./public/images/Screenshot_20251219_235252.png)

> **Link**: Calendar: https://mcckyle.github.io/the-calendar/

## Installation

To get the project running locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/mcckyle/the-calendar.git
   ```

2. Navigate into the project directory:
   ```bash
   cd the-calendar
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   The calendar will go live at `http://localhost:5173/the-calendar/`.
   
## Project Structure

```
the-calendar/
├── .git/                  # Git version control directory.
├── .github/               
│   └── workflows/
│       └── main.yml
│
├── public/                # Demo screenshots folder.
│   └── images/
│
├── src/                   # Source code for the React app.
│   ├── components/        # Reusable UI components.
│   │   ├── Calendar/
│   │   │   ├── Calendar.jsx
│   │   │   ├── Calendar.css
│   │   │   └── CalendarContext.jsx
│   │   ├── WeekNavigation/
│   │   │   ├── WeekNavigation.jsx
│   │   │   └── WeekNavigation.css
│   │   ├── DaysOfWeek/
│   │   │   ├── DaysOfWeek.jsx
│   │   │   └── DaysOfWeek.css
│   │   ├── WeekDayColumn/
│   │   │   ├── WeekDayColumn.jsx
│   │   │   └── WeekDayColumn.css
│   │   ├── TimeSlot/
│   │   │   ├── TimeSlot.jsx
│   │   │   └── TimeSlot.css
│   │   ├── EventPanel/
│   │   │   ├── EventPanel.jsx
│   │   │   └── EventPanel.css
│   │   └── EventCard/
│   │       ├── EventCard.jsx
│   │       └── EventCard.css
│   │
│   ├── data/              # events.json data.
│   ├── hooks/             # Custom hooks and API call.
│   ├── utils/             # Calendar formatting helper functions.
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css          # Global styles.
│
├── __tests__/             # Unit tests.
│   ├── Calendar.test.jsx
│   ├── CalendarContext.test.jsx
│   ├── WeekNavigation.test.jsx
│   ├── DaysOfWeek.test.jsx
│   ├── WeekDayColumn.test.jsx
│   ├── TimeSlot.test.jsx
│   ├── EventPanel.test.jsx
│   └── EventCard.test.jsx
│
├── .gitignore            # Files and directories to ignore in Git.
├── .babelrc
├── eslint.config.js
├── vite.config.js
├── jest.config.cjs
├── jest.setup.js
├── setupTests.js
├── index.html
├── package-lock.json
├── package.json          # Project metadata and dependencies.
├── LICENSE
└── README.md             # Project documentation.
```

## Project Status & Roadmap

- **Current Status**: This project is in its early stages, with a fully functioning calendar interface, event viewing, and week navigation.
- **Upcoming Features**:
  - User authentication for adding/editing events.
  - Drag-and-drop event scheduling.
  - Event reminders and notifications.

## Contributing

This project is open-source and actively welcomes contributions. Here's how you can get involved:

1. **Fork the repository** and clone it to your local machine.
2. Create a **new branch** for your feature or bug fix.
3. **Make changes** and commit them with descriptive messages.
4. **Push** your changes to your forked repository.
5. **Submit a pull request** outlining the changes you made and the problem they address.

Please feel free to **open an issue** for any bugs, improvements, or new feature suggestions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **React**: A JavaScript library for building user interfaces. Special thanks to the React team for creating such a powerful and flexible tool.
- **Vite**: A next-generation build tool that provides fast development and optimized production builds. Thanks to the Vite team for their excellent tool.
- **CSS Grid & Flexbox**: Thank you to the CSS working group for developing these modern layout techniques that allowed for a responsive and user-friendly design.
- **Open Source Community**: A huge thank you to the open-source community for providing numerous resources, tutorials, and libraries that made the development of this project much easier.
- **Saint Louis Community**: Special thanks to the vibrant Saint Louis community for inspiring the creation of this calendar, and for providing a wealth of cultural and community events that enabled the project and content.
