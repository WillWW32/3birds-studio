"use client";

export default function FacebookEmbed() {
  return (
    <div className="w-full">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F3birdsstudio&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
        width="340"
        height="500"
        style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="3 Birds Studio on Facebook"
      />
    </div>
  );
}
