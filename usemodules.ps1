$p = $((Get-Item -Path ".\" -Verbose).FullName) + "\node_modules\.bin"
if ( Test-Path $p -PathType Container ) {
    $env:Path += ";" + $p
    echo "$p >> PATH"
} else {
    echo "Could not find \node_modules\.bin\ relative to directory $((Get-Item -Path ".\" -Verbose).FullName)"
}