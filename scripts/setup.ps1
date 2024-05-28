# Get the path to the .git folder
$gitDir = git rev-parse --git-dir

# Define the .gitexclude file path
$gitExcludeFile = "$gitDir\info\exclude"

# Add CSS files to the .gitexclude file
Add-Content -Path $gitExcludeFile -Value "*.css"

Write-Output "Local .gitexclude file has been updated to exclude CSS files."
