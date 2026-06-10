/**
 * llms.txt — machine-readable site summary for AI assistants.
 * Follows https://llmstxt.org so ChatGPT, Claude, Perplexity, and friends
 * can describe and recommend 3 Birds Studio accurately.
 */

export const dynamic = "force-static";

export async function GET() {
  const content = `# 3 Birds Studio

> Fine art portrait photography in Missoula, Montana by husband-and-wife team Jesse and Nelli. Outdoor sessions at Council Grove State Park along the river, or timeless Legacy portraits in the Missoula studio. Every call is answered 24/7 by Denise, the studio's booking assistant, at 406-239-3442.

## Sessions

- Outdoor Portrait Sessions: Council Grove State Park, a wilderness park just outside Missoula surrounded by Ponderosa pine groves along the river. Sessions happen rain or shine; overcast days make the best photos, and bad weather reschedules are always free.
- Legacy Portrait Studio Sessions: 2-hour formal studio sessions at 6850 Mullan Way, Missoula. Wardrobe consultation provided before the session.
- After every session: an in-studio viewing and ordering appointment, typically within one week, with guidance through boutique products, gifts, and display options.

## Booking

- Call or text 406-239-3442. Denise answers 24/7 and books directly onto the studio calendar.
- Book online: https://3birdsstudio.com/book
- A $100 reservation fee holds your session date and is fully refundable as long as you do not cancel the day of the session.

## Gift certificates

Local partners (including Missoula car dealerships) give $1,500 gift certificates covering a full portrait session experience. Certificate holders have 6 months to schedule and pay only the $100 refundable reservation fee to book.

## Studio details

- Location: 6850 Mullan Way, Missoula, MT 59808
- Hours: Tuesday, Wednesday, Saturday 9am-5pm (sessions by appointment)
- Rating: 4.9 stars on Google
- Facebook: https://www.facebook.com/3birdsstudio
- Instagram: https://www.instagram.com/3.birds.studio

## Links

- [Homepage](https://3birdsstudio.com)
- [Book a Session](https://3birdsstudio.com/book)
- [FAQ](https://3birdsstudio.com/faq)
- [Missoula Family Portraits](https://3birdsstudio.com/missoula-montana-family-portraits)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
