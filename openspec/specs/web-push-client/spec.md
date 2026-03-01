# Web Push Client

## Purpose

Enable client-side support for receiving and handling push notifications from a web push service.
## Requirements
### Requirement: Web Push Subscription UI
The system SHALL provide a UI component (e.g., a button or toggle in the footer or settings) that allows users to enable push notifications for new blog posts.

#### Scenario: User enables notifications
- **WHEN** a user clicks the "Enable Notifications" button
- **THEN** the system SHALL request permission from the browser's Notification API

### Requirement: Service Worker Push Event Handling
The Service Worker (`sw.js`) SHALL be capable of receiving `push` events from a push service and displaying a notification to the user, even when the site is not open in the foreground.

#### Scenario: Background push notification received
- **WHEN** a push message is sent to the subscribed endpoint
- **THEN** the Service Worker SHALL display a notification with the message content (e.g., "New Post: [Title]")

### Requirement: Notification Click Handling
When a user clicks on a push notification, the Service Worker SHALL open the linked blog post URL in a new window or focus an existing one if already open.

#### Scenario: Clicking a notification
- **WHEN** a user clicks the push notification
- **THEN** the browser SHALL navigate to the specific blog post URL associated with the notification

