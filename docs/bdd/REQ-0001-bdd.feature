Feature: 文档/BDD 驱动开发：所有开发要求必须落库 (REQ-0001)
  As a user
  I want 文档/BDD 驱动开发：所有开发要求必须落库
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

