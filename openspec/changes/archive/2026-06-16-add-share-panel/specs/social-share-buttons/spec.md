## MODIFIED Requirements

### Requirement: Social Sharing Links on Posts
The system SHALL provide a unified `SharePanel` component on blog post pages containing interactive social sharing links for Twitter (X), Threads, Facebook, LinkedIn, and LINE. These links SHALL automatically include the current post's URL and title in the shared content. The `SharePanel` SHALL also contain a copy-link button (see Requirement: Copy Link in Share Panel). The standalone `ShareButtons` component SHALL be removed.

#### Scenario: Clicking a share button
- **WHEN** a user clicks a share button for a specific platform
- **THEN** a new window or tab SHALL open with the platform's sharing interface, pre-populated with the post's title and absolute URL

##### Example: share URL construction per platform

| Platform | Expected URL pattern |
|----------|----------------------|
| Twitter/X | `https://twitter.com/intent/tweet?text=<encoded-title>&url=<encoded-url>` |
| Threads | `https://www.threads.net/intent/post?text=<encoded-title>%20<encoded-url>` |
| Facebook | `https://www.facebook.com/sharer/sharer.php?u=<encoded-url>` |
| LinkedIn | `https://www.linkedin.com/sharing/share-offsite/?url=<encoded-url>` |
| LINE | `https://social-plugins.line.me/lineit/share?url=<encoded-url>` |

#### Scenario: LinkedIn share opens correct URL
- **WHEN** a user clicks the LinkedIn share button
- **THEN** a new tab SHALL open to `https://www.linkedin.com/sharing/share-offsite/?url=<encoded-post-url>`

#### Scenario: LINE share opens correct URL
- **WHEN** a user clicks the LINE share button
- **THEN** a new tab SHALL open to `https://social-plugins.line.me/lineit/share?url=<encoded-post-url>`

### Requirement: Share Button Placement
The `SharePanel` SHALL be placed at the bottom of the blog post article, after the main content, replacing the previous standalone `ShareButtons` location. The standalone `CopyLink` button at the top of the post header area SHALL be removed.

#### Scenario: Visibility of share panel
- **WHEN** a user is viewing a blog post
- **THEN** the `SharePanel` component containing all share links and the copy-link button SHALL be clearly visible at the bottom of the post

## ADDED Requirements

### Requirement: Copy Link in Share Panel
The `SharePanel` component SHALL include a copy-link button that, when clicked, copies the current post's full URL to the user's clipboard and displays a translated success message for 2 seconds before reverting to the original label.

#### Scenario: URL copied successfully
- **WHEN** the user clicks the copy-link button inside the `SharePanel`
- **THEN** the current page URL SHALL be saved to the clipboard, and the button label SHALL switch to the translated "copied" text for 2 seconds before reverting

#### Scenario: Copy fails silently
- **WHEN** the clipboard write operation throws an error (e.g., unsupported browser)
- **THEN** the error SHALL be logged to `console.error` and no visible UI change SHALL occur
