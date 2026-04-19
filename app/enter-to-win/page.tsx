// Alias route — existing Meta ads point at /enter-to-win. Re-export the /win
// page so ad links keep working post-DNS-cutover. When we eventually retire
// the old URL, swap this to a redirect.
export { default, metadata } from "../win/page";
