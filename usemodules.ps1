param (
    [switch]$g = $false
)
$p = $((Get-Item -Path ".\" -Verbose).FullName) + "\node_modules\.bin"
if ( Test-Path $p -PathType Container ) {
    if ($g) {
        $env:Path = $env:Path + ";" + $p
        echo "$p : PATH<"
    } else {
        $env:Path = $p + ";" + $env:Path
        echo "$p : >PATH"
    }

} else {
    echo "Could not find \node_modules\.bin\ relative to directory $((Get-Item -Path ".\" -Verbose).FullName)"
}