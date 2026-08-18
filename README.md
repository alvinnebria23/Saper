# Saper - Shopee Affiliate Dashboard Tracker

A React Native mobile application for tracking and managing Shopee affiliate sales, conversions, and performance metrics in real-time.

## Overview

Saper is a comprehensive dashboard solution for Shopee affiliate marketers. It provides an intuitive interface to monitor sales performance, track conversion metrics, generate affiliate links, and manage account information—all from your mobile device.

## Features

- **User Authentication**: Secure login and registration with email verification
- **Dashboard**: Real-time overview of sales performance and key metrics
- **Conversion Tracking**: Monitor conversion rates and detailed conversion reports
- **Link Generation**: Create and manage Shopee affiliate links easily
- **Admin Panel**: Advanced features for administrative users
- **User Account Management**: View and manage account details
- **Responsive Design**: Optimized for various mobile screen sizes
- **Data Visualization**: Charts and graphs for performance analytics
- **Date Range Filtering**: Flexible date range selection for detailed analysis
- **Local Storage**: Persistent data caching for offline access

## Tech Stack

### Core Framework
- **React Native** (0.71.8) - Cross-platform mobile framework
- **Expo** (~48.0.18) - Development platform and distribution service
- **React Navigation** (^6.0.8) - Navigation library

### UI Components & Styling
- **Native Base** (3.4.25) - Component library for React Native
- **React Native Vector Icons** (@expo/vector-icons) - Icon library
- **React Native Chart Kit** (^6.12.0) - Data visualization

### State Management & Forms
- **React Hook Form** (^7.43.1) - Form state management
- **Context API** - Global state management for user data

### Storage & Data
- **Async Storage** (@react-native-async-storage) - Local storage
- **Axios** (^1.3.4) - HTTP client for API requests

### Utilities
- **Moment.js** (^2.29.4) - Date and time handling
- **Lodash** (^4.17.21) - Utility functions
- **UUID** (^9.0.0) - Unique identifier generation

### Additional Libraries
- **react-native-gesture-handler** - Gesture support
- **react-native-tab-view** - Tab navigation
- **react-native-confirmation-code-field** - OTP input
- **react-native-safe-area-context** - Safe area handling
- **react-native-dotenv** - Environment variable management

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** installed globally
- **Android SDK** (for Android development)
- **Xcode** (for iOS development on macOS)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Saper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify dependency compatibility** (optional)
   ```bash
   npm run check-dependencies
   ```

4. **Fix dependencies** (if needed)
   ```bash
   npm run fix-dependencies
   ```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the necessary environment variables:

```env
API_BASE_URL=your_api_base_url
# Add other environment variables as needed
```

### Theme Configuration

Customize the app theme by modifying [theme.js](theme.js). The app uses a centralized theme configuration for consistent styling across all screens.

## Running the Application

### Android
```bash
npm start
# or
npm run android
```

### iOS
```bash
npm run ios
```

### Web
```bash
npm run web
```

### Development Mode
```bash
npm start
```
This will start the Expo development server and display a QR code for mobile testing.

## Project Structure

```
Saper/
├── api/                          # API integration modules
│   ├── AdminApi.js              # Admin-specific API calls
│   ├── LinkApi.js               # Affiliate link management
│   ├── ShopeeApi.js             # Shopee API integration
│   └── UserApi.js               # User authentication & profile
│
├── components/                   # Reusable UI components
│   ├── button/                  # Button variants
│   │   ├── datepicker-button.js
│   │   ├── LinkButton.js
│   │   └── rounded-button.js
│   ├── card/                    # Card components
│   │   ├── dashboard-card.js
│   │   ├── detail-card.js
│   │   └── card.js
│   ├── dialog/                  # Dialog components
│   │   └── alert-dialog.js
│   ├── image/                   # Image components
│   │   ├── image-logo.js
│   │   └── no-data-found.js
│   ├── input/                   # Input components
│   │   ├── borderless-input.js
│   │   └── left-icon-input.js
│   ├── label/                   # Label components
│   │   └── two-column-label.js
│   ├── modal/                   # Modal components
│   │   └── range-date-picker-modal.js
│   ├── spinner/                 # Loading spinners
│   │   └── custom-modal-spinner.js
│   └── tab/                     # Tab navigation
│       └── bottom-tab-navigator.js
│
├── constants/                    # Application constants
│   ├── bottom-navigator-constants.js
│   ├── conversion-report-constants.js
│   ├── dashboard-constants.js
│   ├── register-screen-constants.js
│   ├── regex.js                 # Regular expressions
│   ├── styles.js                # Global styles
│   └── view-component-styles.js
│
├── context/                      # React Context (State Management)
│   ├── index.js
│   └── UserContextProvider.js   # User data context
│
├── helpers/                      # Utility helper functions
│   ├── axiosRequest.js          # Axios configuration & interceptors
│   ├── errorHandler.js          # Error handling utilities
│   └── storageHelper.js         # Local storage operations
│
├── hooks/                        # Custom React hooks
│   ├── useAccount.js            # Account management logic
│   ├── useBottomNavigator.js    # Navigation logic
│   ├── useConversion.js         # Conversion tracking
│   ├── useDatePicker.js         # Date selection logic
│   ├── useHome.js               # Home screen logic
│   ├── useLogin.js              # Login logic
│   └── useRegister.js           # Registration logic
│
├── screens/                      # Application screens
│   ├── account-screen.js        # User account management
│   ├── admin-screen.js          # Admin dashboard
│   ├── conversion-report-screen.js
│   ├── dashboard-screen.js      # Main dashboard
│   ├── generate-link-screen.js  # Link generation
│   ├── home-screen.js           # Home/tabbed navigation
│   ├── login-screen.js          # Authentication
│   ├── register-screen.js       # User registration
│   ├── unauthorized-screen.js   # Access denied
│   ├── verification-screen.js   # Email verification
│   └── index.js
│
├── util/                         # Utility functions
│   ├── CommonUtil.js            # Common utilities
│   ├── DateUtil.js              # Date formatting and calculations
│   └── ValidateInput.js         # Input validation
│
├── validations/                  # Validation logic
│   └── ValidateInput.js
│
├── android/                      # Android native code
├── assets/                       # Static assets
├── App.js                        # Main app component
├── app.json                      # Expo configuration
├── babel.config.js               # Babel configuration
├── eas.json                      # EAS Build configuration
├── metro.config.js               # Metro bundler configuration
├── theme.js                      # Global theme configuration
└── package.json                  # Dependencies and scripts
```

## API Integration

The application integrates with Shopee API through the API modules:

- **UserApi.js**: Handles user authentication, login, registration, and profile management
- **ShopeeApi.js**: Manages Shopee affiliate data and metrics
- **LinkApi.js**: Handles affiliate link creation and management
- **AdminApi.js**: Provides administrative functions

API requests are configured in [helpers/axiosRequest.js](helpers/axiosRequest.js) with interceptors for authentication and error handling.

## Key Components Overview

### Navigation
- Uses React Navigation Stack Navigator
- Bottom Tab Navigator for main app navigation
- Custom navigation hooks for screen-specific logic

### State Management
- **Context API** for global user data
- **Custom hooks** for feature-specific state
- **Local storage** for persistent data

### Forms
- **React Hook Form** for form state management
- Custom input components with validation
- Real-time validation feedback

### Data Visualization
- **React Native Chart Kit** for charts and graphs
- Dashboard cards for key metrics
- Conversion reports with detailed analytics

## Authentication Flow

1. User opens the app → Login Screen
2. User can login or register
3. Email verification required for new accounts
4. Upon successful verification → Home Screen
5. Admin users have access to Admin Panel
6. Unauthorized users redirected to Unauthorized Screen

## Troubleshooting

### Dependencies Issue
If you encounter dependency issues, run:
```bash
npm run fix-dependencies
```

### Clearing Cache
```bash
expo start --clear
```

### Android Issues
- Clear Android build cache: `cd android && ./gradlew clean`
- Rebuild: `cd .. && npm run android`

### iOS Issues
- Clear pods: `cd ios && rm -rf Pods && pod install`
- Rebuild: `cd .. && npm run ios`

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch
2. Make your changes
3. Test on both Android and iOS
4. Submit a pull request

## Support

For issues or questions, please create an issue in the repository or contact the development team.

## License

[Add your license information here]

## Version History

- **v1.0.4** (versionCode 6) - Current release

---

**Last Updated**: 2026-08-18
