param(
    [switch] $Push,
    [string] $Tag = "Qa",
    [string] $BuildCommand = "BuildCommand=build:qa"
)

Publish-Image -Dockerfile ./docker/Dockerfile -ImageName "mg.atlp.portal.ui" -Tag $Tag -Push:$Push -BuildArg $BuildCommand