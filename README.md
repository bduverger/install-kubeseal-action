# Install Kubeseal

Selfhosted runners do not come with the GH CLI out of the box. This action is an easy-to-use way to install it.

## Usage

```yaml
- name: Install kubeseal
  uses: bduverger/install-kubeseal-action
  with:
    cli-release: 0.20.2
    platform: linux
    arch: amd64
```

## Variables

| Variable | Description | Default |
| --- | --------- | --- |
| `cli-release` | Version of the Kubeseal to install | `0.20.2` |
| `platform` | Platform to use for the binary | `linux` |
| `arch` | CPU Architecture for the binary | `amd64` |
