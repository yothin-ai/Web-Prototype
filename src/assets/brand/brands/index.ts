import stanley from './stanley.avif'
import ha_huang from './ha-huang.avif'
import bandex from './bandex.avif'
import takamura from './takamura.avif'
import senix from './senix.avif'
import super_products from './super-products.avif'
import dos from './dos.avif'
import chiq from './chiq.avif'
import samsung from './samsung.avif'
import gyproc from './gyproc.avif'
import holztur from './holztur.avif'
import sa_le from './sa-le.avif'
import eilon from './eilon.avif'
import bison from './bison.avif'
import dura_one from './dura-one.avif'
import shera from './shera.avif'
import verno from './verno.avif'
import weber from './weber.avif'
import bosch from './bosch.avif'
import delicato from './delicato.avif'
import dewalt from './dewalt.avif'
import lwd from './lwd.avif'
import marbella from './marbella.avif'
import nippon_paint from './nippon-paint.avif'
import tcl from './tcl.avif'
import tefal from './tefal.avif'
import black_decker from './black-decker.avif'
import conwood from './conwood.avif'
import great_wood from './great-wood.avif'
import hafele from './hafele.avif'
import honda from './honda.avif'
import jorakay from './jorakay.avif'
import kohler from './kohler.avif'
import tra_phet from './tra-phet.avif'
import sherman from './sherman.avif'
import snook_toys from './snook-toys.avif'
import tvt2002 from './tvt2002.avif'
import wave from './wave.avif'
import wellingtan from './wellingtan.avif'
import window_asia from './window-asia.avif'

// Popular-brand logos supplied for the hardware Dataset. They are the owners' trademarks, shown so the
// prototype looks like a finished shop; nothing links to them. A brand tile shows its logo when a
// logo here has the same name.
export const brandLogos = [
  { th: "Stanley", en: "Stanley", src: stanley },
  { th: "ห้าห่วง", en: "Ha Huang", src: ha_huang },
  { th: "Bandex", en: "Bandex", src: bandex },
  { th: "Takamura", en: "Takamura", src: takamura },
  { th: "Senix", en: "Senix", src: senix },
  { th: "Super Products", en: "Super Products", src: super_products },
  { th: "DOS", en: "DOS", src: dos },
  { th: "CHiQ", en: "CHiQ", src: chiq },
  { th: "Samsung", en: "Samsung", src: samsung },
  { th: "Gyproc", en: "Gyproc", src: gyproc },
  { th: "Holztur", en: "Holztur", src: holztur },
  { th: "Sa-le", en: "Sa-le", src: sa_le },
  { th: "Eilon", en: "Eilon", src: eilon },
  { th: "Bison", en: "Bison", src: bison },
  { th: "Dura One", en: "Dura One", src: dura_one },
  { th: "Shera", en: "Shera", src: shera },
  { th: "Verno", en: "Verno", src: verno },
  { th: "Weber", en: "Weber", src: weber },
  { th: "Bosch", en: "Bosch", src: bosch },
  { th: "Delicato", en: "Delicato", src: delicato },
  { th: "DeWalt", en: "DeWalt", src: dewalt },
  { th: "LWD", en: "LWD", src: lwd },
  { th: "Marbella", en: "Marbella", src: marbella },
  { th: "Nippon Paint", en: "Nippon Paint", src: nippon_paint },
  { th: "TCL", en: "TCL", src: tcl },
  { th: "Tefal", en: "Tefal", src: tefal },
  { th: "Black+Decker", en: "Black+Decker", src: black_decker },
  { th: "Conwood", en: "Conwood", src: conwood },
  { th: "Great Wood", en: "Great Wood", src: great_wood },
  { th: "Häfele", en: "Häfele", src: hafele },
  { th: "Honda", en: "Honda", src: honda },
  { th: "Jorakay", en: "Jorakay", src: jorakay },
  { th: "Kohler", en: "Kohler", src: kohler },
  { th: "ตราเพชร", en: "Tra Phet", src: tra_phet },
  { th: "Sherman", en: "Sherman", src: sherman },
  { th: "Snook & Toys", en: "Snook & Toys", src: snook_toys },
  { th: "TVT2002", en: "TVT2002", src: tvt2002 },
  { th: "Wave", en: "Wave", src: wave },
  { th: "Wellingtan", en: "Wellingtan", src: wellingtan },
  { th: "Window Asia", en: "Window Asia", src: window_asia },
]

export const brandLogo = (name: string | undefined) => brandLogos.find((b) => b.th === name || b.en === name)?.src
