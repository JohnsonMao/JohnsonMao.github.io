# Blog Related Content

## Purpose

Discovery mechanism to recommend relevant articles based on tag overlap.

## Requirements

### Requirement: Related Articles recommendation logic
The system SHALL provide a "Related Articles" section at the end of each blog post. This section SHALL recommend other blog posts from the same locale based on tag overlap. Posts sharing the most tags with the current post SHOULD be ranked higher. If multiple posts have the same number of shared tags, they SHOULD be sorted by publication date (newest first).

#### Scenario: Related articles displayed
- **WHEN** a blog post is rendered
- **THEN** the layout SHALL display up to 3-5 related articles that share at least one tag with the current post

#### Scenario: Fallback when no tags overlap
- **WHEN** no other articles share tags with the current post
- **THEN** the "Related Articles" section SHALL display the latest posts from the same locale or be gracefully hidden
