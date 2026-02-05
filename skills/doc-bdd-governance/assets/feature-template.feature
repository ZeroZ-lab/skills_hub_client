Feature: {{TITLE}} ({{REQ_ID}})
  As a user
  I want {{TITLE}}
  So that the requirement is satisfied

  Background:
    Given the repo follows AGENTS.md rules

  Scenario: Happy path
    Given <precondition>
    When <action>
    Then <expected outcome>

  Scenario: Failure or edge case
    Given <precondition>
    When <action>
    Then <error/edge outcome>

