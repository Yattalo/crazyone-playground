import { List, ActionPanel, Action, showToast, Toast } from "@raycast/api";

/**
 * {{COMMAND_NAME}}
 *
 * {{COMMAND_DESCRIPTION}}
 *
 * Ecosystem: {{ECOSYSTEM}}
 */
export default function Command() {
  return (
    <List searchBarPlaceholder="Search...">
      <List.Item
        title="{{EXTENSION_NAME}}"
        subtitle="Ready to go"
        actions={
          <ActionPanel>
            <Action
              title="Run"
              onAction={async () => {
                await showToast({
                  style: Toast.Style.Success,
                  title: "Done",
                  message: "{{COMMAND_NAME}} executed successfully",
                });
              }}
            />
          </ActionPanel>
        }
      />
    </List>
  );
}
