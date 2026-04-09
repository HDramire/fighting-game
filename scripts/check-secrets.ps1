$ErrorActionPreference = 'Stop'

$patterns = @(
  'ghp_[A-Za-z0-9]{36,}',
  'github_pat_[A-Za-z0-9_]{20,}',
  'sk_(live|test)_[A-Za-z0-9]{16,}',
  'AIza[0-9A-Za-z\-_]{35}',
  '(?i)api[_-]?key\s*[:=]\s*["''][^"'']+["'']',
  '(?i)secret\s*[:=]\s*["''][^"'']+["'']',
  '(?i)token\s*[:=]\s*["''][^"'']+["'']',
  '(?i)password\s*[:=]\s*["''][^"'']+["'']',
  '-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'
)

$excludeGlobs = @(
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.vite',
  '.parcel-cache',
  '.cache'
)

$files = Get-ChildItem -Recurse -File | Where-Object {
  $fullName = $_.FullName
  foreach ($exclude in $excludeGlobs) {
    if ($fullName -match [regex]::Escape("\$exclude\")) {
      return $false
    }
  }
  return $true
}

$matches = @()

foreach ($file in $files) {
  foreach ($pattern in $patterns) {
    $result = Select-String -Path $file.FullName -Pattern $pattern -AllMatches -ErrorAction SilentlyContinue
    if ($result) {
      $matches += $result
    }
  }
}

if ($matches.Count -gt 0) {
  Write-Host 'Potential secrets detected:' -ForegroundColor Red
  $matches | ForEach-Object {
    Write-Host "$($_.Path):$($_.LineNumber) $($_.Line.Trim())"
  }
  exit 1
}

Write-Host 'Secret scan passed.' -ForegroundColor Green
