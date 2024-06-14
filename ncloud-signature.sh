function makeSignature() {
	nl=$'\\n'

	TIMESTAMP="$1"
	echo $TIMESTAMP
	ACCESSKEY="$2"
	echo $ACCESSKEY
	SECRETKEY="$3"
	echo "$SECRETKEY"

	METHOD="GET"
	URI="$4"
	echo "$URI"

	SIG="$METHOD"' '"$URI"${nl}+"$TIMESTAMP"${nl}+"$ACCESSKEY"
	echo $SIG

	SIGNATURE=$(echo -n -e "$SIG"|iconv -t utf8 |openssl dgst -sha256 -hmac $SECRETKEY -binary|openssl enc -base64)
}