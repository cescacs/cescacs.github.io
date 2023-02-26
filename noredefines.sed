#!/usr/bin/sed -f

#Delete single line comments
/\{.*\}/d;
#Delete multiline comments
/\{/,/\}/d;

#Remove spaces and dots at the begining of the line
s/^[[:space:]]*(\.[[:space:]]*)*//g;
#Remove spaces at the end of the line
s/[[:space:]]*$//g;

#Delete empty lines
/^$/d;
#Delete Redefine label
/^\[Redefine/d;

#Translate FAN pieces
y/♙♟☖☗♗♝♘♞🩐🩓♖♜🩏🩒♕♛♔♚/PPEEJJNNGGRRVVDDKK/

#Bishop to J (moves & captures)
s/\b[ABFL]([A-IKLPTXZ][0-9][0-9]?)\b/J\1/g;

#Bishop to J (promotion)
s/\b([A-GJKLNQRSTVW]?[A-IKLPTXZ][0-9][0-9]?=)[ABFL]\b/\1J/g;

#Knight to N (moves & captures)
s/\b[CS]([A-IKLPTXZ][0-9][0-9]?)\b/N\1/g;

#Knight to N (promotion)
s/\b([A-GJKLNQRSTVW]?[A-IKLPTXZ][0-9][0-9]?=)[CS]\b/\1N/g;

#Rook to R (moves & captures)
s/\bT([A-IKLPTXZ][0-9][0-9]?)\b/R\1/g;

#Rook to R (promotion)
s/\b([A-GJKLNQRSTVW]?[A-IKLPTXZ][0-9][0-9]?=)T\b/\1R/g;

#Rook to R (castling)
s/\bKT([DK][‐-][DEFHI][DEFHGK])\b/KR\1/g;

#Rook to R (castling special case)
s/\bKTK([‐-]HIO[O])\b/KRK\1/g;

#Rook to R (double castling)
s/\bKTT([‐-][HFE][GHE][IGEF])\b/KRR\1/g;

#Wyvern to V (moves & captures)
s/\bW([A-IKLPTXZ][0-9][0-9]?)\b/V\1/g;

#Wyvern to V (promotion)
s/\b([A-GJKLNQRSTVW]?[A-IKLPTXZ][0-9][0-9]?=)W\b/\1V/g;

#Queen to D (moves & captures)
s/\bQ([A-IKLPTXZ][0-9][0-9]?)\b/D\1/g;

#Queen to D (promotion)
s/\b([A-GJKLNQRSTVW]?[A-IKLPTXZ][0-9][0-9]?=)Q\b/\1D/g;

#White Bishop to J (TLPD)
:LWJ;
s/(\/[0-9][0-9]?\.[0-9a-zCDEGH-KM-Z]*)[ABFL]/\1J/g;
tLWJ;

#Black Bishop to j (TLPD)
:lbj;
s/(\/[0-9][0-9]?\.[0-9A-Zcdegh-km-z]*)[abfl]/\1j/g;
tlbj;

#White Knight to N (TLPD)
:LWN;
s/(\/[0-9][0-9]?\.[0-9a-zABD-RT-Z]*)[CS]/\1N/g;
tLWN;

#Black Knight to n (TLPD)
:lbn;
s/(\/[0-9][0-9]?\.[0-9A-Zabd-rt-z]*)[cs]/\1n/g;
tlbn;

#White Rook to R (TLPD)
:LWR;
s/(\/[0-9][0-9]?\.[0-9a-zA-SU-Z]*)T/\1R/g;
tLWR;

#Black Rook to r (TLPD)
:lbr;
s/(\/[0-9][0-9]?\.[0-9A-Za-su-z]*)t/\1r/g;
tlbr;

#White Wyvern to V (TLPD)
:LWV;
s/(\/[0-9][0-9]?\.[0-9a-zA-VXYZ]*)W/\1V/g;
tLWV;

#Black Wyvern to v (TLPD)
:lbv;
s/(\/[0-9][0-9]?\.[0-9A-Za-vxyz]*)w/\1v/g;
tlbv;

#White Queen to D (TLPD)
:LWD;
s/(\/[0-9][0-9]?\.[0-9a-zABCE-PR-Z]*)Q/\1D/g;
tLWD;

#Black Queen to d (TLPD)
:lbd;
s/(\/[0-9][0-9]?\.[0-9A-Zabce-pr-z]*)q/\1d/g;
tlbd;

#Castling indicators (TLPD)
s/\bT([K-][TR-][tr-][k-][tr-])\b/R\1/g;
s/\b([TR-][K-])T([tr-][k-][tr-])\b/\1R\2/g;
s/\b([TR-][K-][TR-])t([k-][tr-])\b/\1r\2/g;
s/\b([TR-][K-][TR-][tr-][k-])t\b/\1r/g;
