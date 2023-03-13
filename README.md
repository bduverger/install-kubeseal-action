# Install GH CLI action

Selfhosted runners do not come with the GH CLI out of the box. This action is an easy-to-use way to install it.

## Usage

```yaml
- name: Install GH CLI
  uses: alexnorell/install-gh-cli-action
  with:
    cli-release: 2.24.3
    gh-platform: linux
    gh-arch: amd64
```

## Variables

| Variable | Description | Default |
| --- | --------- | --- |
| `cli-release` | Version of the GH CLI to install | `2.24.3` |
| `platform` | Platform to use for the binary | `linux` |
| `arch` | CPU Architecture for the binary | `amd64` |
