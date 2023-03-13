# Install GH CLI action

Selfhosted runners do not come with the GH CLI out of the box. This action is an easy-to-use way to install it.

## Usage

```yaml
- name: Install GH CLI
  uses: alexnorell/install-gh-cli-action
  with:
    gh-cli-version: 2.14.2 # optional, see action.yml for current default
```

## Variables

| Variable | Description | Default |
| --- | --------- | --- |
| `gh-cli-version` | Version of the GH CLI to install | `2.24.3` |
| `platform` | Platform to use for the binary | `linux` |
| `arch` | CPU Architecture for the binary | `amd64` |
