import {makeAutoObservable} from "mobx";
import {ITour} from "../interfaces/ITour";

//fake api call
const fetchTours = (success: boolean, timeout: number): Promise<Array<ITour>> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve([
                    {
                        "id": 0,
                        "title": "Anantara Al Jabal Al Akhdar Resort — Nizwa, Oman",
                        "description": "Set in the sunburnt Al-Hajar mountains, on the rim of the Arabian Peninsula’s most outrageously beautiful canyon, is Anantara Al Jabal Al Akhdar Resort—the region’s most ambitious wilderness hotel. The space has souped up Oman’s wild frontier to the max, with chasm-facing pool villas, majlis-style courtyards, a lantern-lit outdoor hookah space, and super-slick service. This being the splashy Gulf of Oman, there has to be a superlative or two: The hotel has the highest swimming pools, tennis court, and stargazing platform in the Middle East. But its real essence is pure escapism, whether rappelling down the side of a mountain or relaxing in the impeccable spa with its energizing hammam rituals and fragrant frankincense oils. It’s a bold, almost transcendental experiment in off-the-map tourism, and at the vanguard of a growing number of Middle Eastern hotels opening in unexpected and wonderfully extreme locations.",
                        "price": "457$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f68161d68f371240312a111/master/w_400%2Cc_limit/Anantara-Al-Jabal-Al-Akhdar-Resort.jpg"
                    },
                    {
                        "id": 1,
                        "title": "Taj Exotica Resort & Spa, Goa — Benaulim, India",
                        "description": "This beautiful coastal property is set on 56 acres of tropical gardens and flower-lined patios along a stretch of Benaulim Beach. Goan- and Portuguese-style rooms with sea or garden views have private verandas; select suites and villas come with private pools. Lounge areas are great for relaxing, especially after a day at the beach. Lobster Shack’s very good seafood can be taken on the beach, while Allegria serves coastal and authentic Goan cuisine. Give activities like skeet shooting or archery a go during your stay, or spend an afternoon at a spa that offers Ayurvedic treatments.",
                        "price": "983$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f67bd59978ff785b2501615/master/w_400%2Cc_limit/taj-exotica-goa.jpg"
                    },
                    {
                        "id": 2,
                        "title": "Ashford Castle — Cong, Ireland",
                        "description": "Ashford Castle, overlooking Lough Corrib in the Irish county of Mayo, has been around since the year 1228—but don’t go expecting an old-fashioned experience. The luxurious 82-room property's long list of amenities include a cinema, cigar room, kids’ playroom, billiard room, and wine cellars. The crown jewel, though, is the spa, which is located in a bronze former conservatory and features a white-and-gold tile mosaic entitled “Tree of Life” next to the indoor pool.",
                        "price": "1047$",
                        "imageUrl": "https://media.cntraveler.com/photos/5cc08b0504fdc2449f672606/master/w_400%2Cc_limit/Ashford-Castle_2019_Pool-031.jpg"
                    },
                    {
                        "id": 3,
                        "title": "Kamalame Cay — Andros, Bahamas",
                        "description": "Getting to Kamalame Cay, a private island resort off of Andros Great Barrier Reef, takes a bit of time—you'll fly into Andros, then take a taxi to the port, and then finally a short boat ride to the hotel entrance. But the payoff is evident as soon as you step onto the deck and take in the lush island, with its welcoming Great House, beautifully designed pool area, and calm beaches. All guests of the resort stay in standalone bungalows, which makes it feel even more like you're at your own private island retreat. Each bungalow has a deck—most with direct beach access—as well as its own golf cart and bikes for exploring the 96-acre island. And every morning, breakfast is delivered in a wicker basket, with treats from fresh fruit and juice to house-made pastries and hard-boiled eggs. And while the food at most Caribbean resorts is nothing to write home about, Kamalame stands out in the care it takes in its food, with rotating dishes like ceviche, seafood salads, crab-stuffed avocado, and Bahamian curry. Look to sample some it during the laidback, wine-soaked lunches thrown by David and Michael King-Hew.",
                        "price": "677$",
                        "imageUrl": "https://media.cntraveler.com/photos/5df114c1a6574e0008a09b45/master/w_400%2Cc_limit/Kamalame-Cay_2019_ROCKHOUSE-EXTERIOR.jpg"
                    },
                    {
                        "id": 4,
                        "title": "Little Palm Island Resort & Spa — Little Torch Key, Florida",
                        "description": "Little Palm Island—a private, couples-only oasis—has a total wow factor, since you'll be arriving either by private boat or seaplane. Fifteen thatched roof bungalows hide 30 guest suites that are a romantic world unto themselves. The sultry design never panders to its location and doesn't scream tropical. You'll discover velvet sofas and canopied beds set atop Persian rugs along with a subtle side of British West Indies sophistication. It's a private island escape just off the Florida Keys, but if you close your eyes, you could be convinced that you've landed in the South Pacific.",
                        "price": "715$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f68186bb981fb78a3045f9e/master/w_400%2Cc_limit/Little-Palm-Island-Resort.jpg"
                    },
                    {
                        "id": 5,
                        "title": "The Oberoi, Mauritius — Mauritius",
                        "description": "Roughly 550 miles east of Madagascar, Mauritius has drawn attention from travelers over the years for its remote, pristine beaches. And the country’s Oberoi resort takes full advantage of those famous stretches of sand with its location on Turtle Bay, a natural marine park. The resort is spread across 20 acres of gardens, with villas and pavilions covered with traditional thatched roofs, sunken marble bathrooms, and private garden views. Select villas come with private heated swimming pools. Dine under the stars at one of the resort’s al fresco bars and restaurants, with cuisines ranging from fine Indian dishes to smoked meats seasoned with herbs from the on-site garden.",
                        "price": "1166$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6819917193f8759c50da04/master/w_400%2Cc_limit/the-oberoi-mauritius.jpg"
                    },
                    {
                        "id": 6,
                        "title": "andBeyond Phinda Private Game Reserve — Phinda Private Game Reserve, South Africa",
                        "description": "This 70,560-acre private game reserve sits in northern KwaZulu-Natal, not far from the Indian Ocean on the east coast of South Africa, and features multiple andBeyond lodges on site: Phinda Forest Lodge, Phinda Mountain Lodge, Phinda Rock Lodge, Phinda Vlei Lodge, Phinda Zuka Lodge, and Phinda Homestead. At Phinda Rock Lodge, expansive views of the surrounding ecosystem from all of the six suites with private plunge pools provide the perfect opportunity to view the Big Five from afar. Meals are served on an open deck—a classic way to take in sundowners and listen to the forest’s percussive sounds, like the chatter of monkeys or the chirping of red Tonga squirrels. ",
                        "price": "524$",
                        "imageUrl": "https://media.cntraveler.com/photos/5ad7981718e93c3d9795d537/master/w_400%2Cc_limit/andBeyond-Phinda-Private-Game-Reserve_Phinda-Rock-Lodge-_courtesy-andBeyond.com_2018_Guest-area-views-at-Phinda-Rock-Lodge-(3).jpg"
                    },
                    {
                        "id": 7,
                        "title": "Tintswalo Safari Lodge — Manyeleti Game Reserve, South Africa",
                        "description": "Sharing a border with the renowned Kruger National Park, the luxurious Tintswalo Safari Lodge (located on the private Manyeleti Game Reserve) is one of our readers' favorite places to view wildlife in South Africa. The suites are decorated with rich, Persian rugs, canopied beds, clawfoot tubs, and thatched terraces with private plunge pools that overlook the reserve's watering hole. When you're not on a game drive, freshen up with a complimentary spa treatment or go stargazing with local Shangaan guides.",
                        "price": "115$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f681c85978ff785b2501617/master/w_400%2Cc_limit/Tintswalo-Manor-House_002.jpg"
                    },
                    {
                        "id": 8,
                        "title": "The Ritz-Carlton, Abama — Tenerife, Spain",
                        "description": "At its worst, Tenerife is a perennially packed island overrun with tourists and cookie-cutter resorts. But don't write off the Canary Island hot-spot quite yet—especially if you can swing a stay at The Ritz-Carlton, Abama. The resort is at once family-friendly yet relaxing, massive yet intimate, with 459 rooms and suites that offer a relaxing respite from the island's bustling outdoor spaces. More like a small village than a resort (there's even a train that takes guest from place to place), the red adobe buildings include a spa, seven swimming pools, shopping area, and dining options that include the Michelin-starred Japanese-fusion restaurant Abama Kabuki.",
                        "price": "671$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f681dd6b981fb78a3045fa0/master/w_400%2Cc_limit/ritz-carlton-abama.jpg"
                    },
                    {
                        "id": 9,
                        "title": "Point Grace — Providenciales, Turks and Caicos",
                        "description": "In the midst of the craziness that is Grace Bay, Point Grace still manages to exude a calm, intimate charm. It’s one of the oldest hotels on the beach, and it has a (ahem) grace that few of the big newcomers can match. It has just 28 suites and penthouses, ranging from one to four bedrooms, all with a tropical fruit color palette and overstuffed couches. When hunger strikes, there’s the cheerful, casual poolside Hutchings Restaurant, but when it’s time for something more sophisticated, Grace’s Cottage is a cozy architectural gem with bright-white gingerbread details and outdoor seating beneath starry skied gazebos. The spa makes perfect sense for the location, as it focuses on thalassotherapy (seawater) treatments.",
                        "price": "508$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f681eb5978ff785b2501619/master/w_400%2Cc_limit/point-grace-turks-and-caicos.jpg"
                    },
                    {
                        "id": 10,
                        "title": "Bilimungwe, The Bushcamp Company — South Luangwa National Park, Zambia",
                        "description": "One of the best of the Bushcamp Company properties, Bilimungwe earns top marks for its location in the southern part of Zambia's South Luangwa National Park. Hippos and elephants are known to wander up to the many watering holes and lagoons adjacent to the camp, while leopards prowl by the Luangwa River that runs near the accommodations. Bilimungwe's four chalets feel more like treehouses than traditional lodges, but are luxurious, with mahogany furniture, open-air waterfall showers, and colorful textiles, plus private decks from which to see even more game. The team of excellent guides can take you on walking tours in the morning, game drives in the afternoon, or any combination of the two.",
                        "price": "827$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f681ff468f371240312a113/master/w_400%2Cc_limit/bilimungwe-bushcamp.jpg"
                    },
                    {
                        "id": 11,
                        "title": "Inkaterra Hacienda Urubamba — Sacred Valley, Peru",
                        "description": "Many view the Sacred Valley as a quick stop en route to Machu Picchu, but since the arrival of Inkaterra Hacienda Urubamba, that game has changed. The lodge, on 100 rolling-green acres and with its own onsite organic farm, is more the home of a friend than a hotel, where the staff not only welcomes you with a pisco sour in front of a roaring fireplace, but takes you on guided tours of the neighboring villages and down Inca Trails that are—gasp!—free of tourists. And after you down a cocktail or two, visit the onsite chichería (a local bar where chicha is the drink of choice) to learn how the corn beer is made. It all comes with an unbeatable view of the Andes.",
                        "price": "118$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6821047557491753645014/master/w_400%2Cc_limit/Inkaterra-Hacienda-Urubamba-Peru.jpg"
                    },
                    {
                        "id": 12,
                        "title": "Mandapa, a Ritz-Carlton Reserve — Bali, Indonesia",
                        "description": "The luxe, jungle-based Mandapa, a Ritz-Carlton Reserve achieves something rare: it feels pristine yet ancient. The open-plan open-air lobby, which overlooks an incredible section of the Ayung Valley, is bookended by a black-stone temple and and free-flowing lounges. From here, your patih—or \"king’s assistant\"—will greet you and escort you to one of 35 suites or 25 private pool villas. Mandapa feels like its own village, complete with working rice paddies, steep winding laneways, and the requisite resort pool, spa, cocktail bar, and restaurant.",
                        "price": "1485$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6821be7557491753645016/master/w_400%2Cc_limit/mandapa-bali.jpg"
                    },
                    {
                        "id": 13,
                        "title": "COMO Uma Punakha — Punakha, Bhutan",
                        "description": "This COMO retreat sits at the farthest edge of the Punakha Valley, on the Mo Chu River in central Bhutan. The 11-room hideaway gives harried guests views of terraced rice fields, the temple of Khamsum Yuley Namgay, and snowcapped Himalayan peaks. The restaurant Bukhari, so named for the traditional Bhutanese fireplace, might be the best place to savor these vistas. Park yourself on the outdoor terrace, preferably by a smoking, standing fireplace, for a seasonally driven dinner made with local organic ingredients—red rice, hand-ground buckwheat flour, apple cider vinegar, and hand-molded farm cheese.",
                        "price": "381$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6822a3b981fb78a3045fa2/master/w_400%2Cc_limit/COMO-Uma-Punahkha-Bhutan.jpg"
                    },
                    {
                        "id": 14,
                        "title": "Londolozi — Sabi Sands, South Africa",
                        "description": "Situated within 6 million acres of pristine wilderness, Londolozi has been owned and run by the Varty family for over 90 years. The word londolozi comes from the Zulu language and means “protector of all living things.” Once endorsed by Nelson Mandela, who described it as “a dream I cherish for a model of nature preservation in our country,” it’s one of the best places in the world to see leopards in the wild. Some of Londolozi’s most popular features are its state-of-the-art photographic studio and its Healing House. Breeding herds of elephant and buffalo roam throughout Londolozi, while white rhino and lion concentrations are among the highest on the African continent.",
                        "price": "1167$",
                        "imageUrl": "https://media.cntraveler.com/photos/5bc0b0092383b345456aafad/master/w_400%2Cc_limit/Londolozi__2018_Londolozi-Game-Reserve_-Private-Granite-Suites-River-Bar-.jpg"
                    },
                    {
                        "id": 15,
                        "title": "andBeyond Serengeti Under Canvas — Serengeti, Tanzania",
                        "description": "This semi-permanent camp of nine tents moves with around with the great migration, which means you’ll either see the Grumeti and Mara River crossings or wildebeest calving, depending on the season. Here, you get the bucket shower-bush camp experience, but you’re hardly roughing it. A stay comes with a private butler, surprise three-course picnic lunches made with fresh locally sourced ingredients, and cocktails in the middle of the plains. But sometimes it's the ineffable—the feeling of coming back to the warm, attentive staff after several hours in the bush with a skilled and passionate guide—that truly defines the experience here.",
                        "price": "978$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f682624987090832029b2f2/master/w_400%2Cc_limit/andbeyond-serengeti-under-canvas.jpg"
                    },
                    {
                        "id": 16,
                        "title": "Angama Mara — Great Rift Valley, Kenya",
                        "description": "Angama Mara, which opened in 2016 and sits on top of the Oloololo escarpment overlooking the Mara Triangle, comprises two camps. Each one contains 15 suites with canvas sides and tented roofs, but they also have glass fronts, giving you gobsmacking, 180-views of the savannah, whether you're lying in bed or taking a shower. This is no traditional safari set-up: the sleek, Italian-inflected design gives the place a bit of cosmopolitan flair, as does a pavilion with a library, shop, fitness room, and infinity pool—all while embracing the wild surroundings.",
                        "price": "714$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f682754b981fb78a3045fa4/master/w_400%2Cc_limit/angama-mara.jpg"
                    },
                    {
                        "id": 17,
                        "title": "Lion Sands Game Reserve — Sabi Sands, South Africa",
                        "description": "Set on the banks of the Sabi River, this luxurious resort on 10,000 acres comprises four lodges and a family camp. Ivory Lodge rooms, done in ebony and ivory, have views of the reserve and its animals from private terraces with plunge pools, while the cream and beige rooms at River Lodge have freestanding tubs as well as indoor and outdoor showers. After viewing elephants and lions on open jeep drives, enjoy traditional boma dining. The unique treehouses couldn't be more romantic—lit by lanterns, candles, the stars and the moon. After a picnic dinner, settle in for a night surrounded by the safely distant sounds of hippos, hyenas, leopards, and lions.",
                        "price": "1206$",
                        "imageUrl": "https://media.cntraveler.com/photos/5c4b22c221784e6dc7183e74/master/w_400%2Cc_limit/Lion-Sands-Game-Reserve%2C-Sabi-San__2019_LS-Kingston-Treehouse1.jpg"
                    },
                    {
                        "id": 18,
                        "title": "Baker's Cay Resort Key Largo, Curio Collection by Hilton — Key Largo, Florida",
                        "description": "Open since February 2019 in Key Largo, Baker's Kay Resort has been a hit with Traveler readers from the jump. It spans 13 tropical acres that were once a pineapple plantation tucked away off the busy Overseas Highway. The resort has 200 rooms but manages to maintain a boutique and intimate feel with winding nature trails throughout leading to quiet beaches. Rooms—including lavish suites with views of Florida Bay—have handcrafted wood furnishings, custom tile work in the bathrooms and hardwood floors. There are several options for dining onsite that include poolside tacos, a mobile food truck, and Caribbean-Creole cuisine with more bay views at the more upscale (but still Florida Keys casual) Calusa restaurant. Other amenities include a kids camp, two swimming pools with a waterfall grotto, and hammocks everywhere. Seaplane rides, scuba diving, and fishing charters all can be arranged. The resort is pet-friendly, too, with beachside tiki huts for dogs and even pet lifejackets on offer. Kayaking and paddleboarding are included in the resort fee.",
                        "price": "1307$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6828a668f371240312a115/master/w_400%2Cc_limit/bakers-cay-resort-key-largo.jpg"
                    },
                    {
                        "id": 19,
                        "title": "Under Canvas Mount Rushmore — Keystone, South Dakota",
                        "description": "Camping near a national park is a quintessential American vacation, but not everyone is a fan of sleeping on the ground or trekking to a bathroom in the middle of the night. For those folks, Under Canvas Mount Rushmore is the perfect solution—luxury camping tents that are already set up when you arrive, located just four miles away from Mount Rushmore. The tents sleep between two and four people, with king-size beds, private bathrooms with flushing toilets, and private decks from which to enjoy the surrounding Black Hills during the day or stargaze at night. (Try to book the Stargazer Tent, which has an arched glass skylight over the top of the bed.) There is also a main tent with the resort's lobby and restaurant, plus a fire pit to make s'mores.",
                        "price": "478$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6829ab987090832029b2f4/master/w_400%2Cc_limit/under-canvas-mount-rushmore.jpg"
                    },
                    {
                        "id": 20,
                        "title": "Hotel Paracas, a Luxury Collection Resort, Paracas — Paracas, Peru",
                        "description": "Amid the ruins of the iconic Hotel Paracas that crumbled during an August 2007 earthquake, famed Peruvian architect Bernardo Fort-Brescia designed this new 120-room resort (part of Starwood’s Luxury Collection) in the coastal desert three hours south of Lima. Two-story white bungalows whose design incorporates some $2 million of bamboo blend into the dune-filled horizon, contrasting the deep-blue waters of the Paracas National Reserve. While the bay is better for windsurfing, the daybeds at the glitzy pool scenes, where roving waiters fetch a steady supply of passion fruit sours and ceviche, have become the new it spot for Lima’s well-to-do. The hotel makes a restful base for a slew of nearby adventures—you can do scenic flights of the Nazca desert geoglyphs in its private jet, yacht rides to spot Humboldt penguins on the Islas Ballestas, and pisco tastings at the Viñas de Oro distillery right at the resort.",
                        "price": "271$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f682af37557491753645018/master/w_400%2Cc_limit/hotel-paracas-peru.jpg"
                    },
                    {
                        "id": 21,
                        "title": "Qasr al Sarab Desert Resort by Anantara — Liwa Desert, United Arab Emirates",
                        "description": "A secluded oasis in the desert, Qasr Al Sarab Desert Resort by Anantara is magical—you're surrounded by dunes as far as the eye can see. Reminiscent of a traditional Bedouin village, the resort sits among the incredible rolling red and orange dunes of Rub Al Khali, the world's largest uninterrupted sand desert. Although it's about 75 miles from Abu Dhabi Airport, this property, one of the most beautiful destinations on the planet, is worth the trip.",
                        "price": "1386$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f682c68755749175364501a/master/w_400%2Cc_limit/_Qasral-Sarab-Desert-Resort-by-Anantara.jpg"
                    },
                    {
                        "id": 22,
                        "title": "Terre Blanche Hotel Spa Golf Resort — Tourrettes, France",
                        "description": "Located 30 minutes from Cannes, this beautiful resort's hillside villas are isolated and scenic. All villas boast rattan chairs, local artwork, and private patios with gorgeous mountain views. At the spa, treatments like a sugar and honey scrub are expensive but worth the extravagance. The Guadina restaurant and bar serves Provençal specialties on the terrace.",
                        "price": "1525$",
                        "imageUrl": "https://media.cntraveler.com/photos/5bbe2bb3625211259a973fef/master/w_400%2Cc_limit/Terre-Blanche-Hotel-Spa-Golf-Resort__2018_Terre-Blanche-Spa---Credit---Terre-Blanche-Hotel-Spa-Golf-Resort.jpg"
                    },
                    {
                        "id": 23,
                        "title": "Royal Malewane — Greater Kruger National Park, South Africa",
                        "description": "It can be hard to make the Greater Kruger National Park—a popular destination for safaris that cover an area the size of Wales—feel exclusive, private, and intimate. But Royal Malewane, in Thornybush Private Game Reserve, manages to achieve that (and then some) with just six Luxury suites, two Royal suites, and the palatial six-bedroom, private chef-included Africa House. Twice daily game drives are led by expert rangers far from Kruger's crowds, which means you're almost guaranteed to be able to check off the Big Five before you leave.",
                        "price": "511$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f682e4b987090832029b2f6/master/w_400%2Cc_limit/royal-malewane.jpg"
                    },
                    {
                        "id": 24,
                        "title": "Elewana Sand River Masai Mara — Masai Mara, Kenya",
                        "description": "Located on the banks of the Sand River in Kenya's famous Masai Mara savanna, this Elewana resort is one of the best places to watch Africa's great migration. Seeing millions of wildebeest running across the landscape is one for the bucket lists, and Elewana Collection makes sure your viewing experience is comfortable as well as incredible: think 16 tented accommodations with glamorous interiors to rival Old Hollywood, fluffy robes and slippers, and private decks. Even if your visit doesn't coincide with the migration, you'll still be rewarded with ample wildlife viewing opportunities—this is Masai Mara, after all—and extra activities like dinner in the bush and hot air balloon rides.",
                        "price": "1265$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f682fe0987090832029b2f8/master/w_400%2Cc_limit/elewana-sand-river.jpg"
                    },
                    {
                        "id": 25,
                        "title": "Royal Champagne Hotel & Spa — Champillon, France",
                        "description": "If it all sounds a bit over the top, it is. Just uphill from the pretty village of Hautvillers where Dom Perignon lived and died is the Royal Champagne Hotel and Spa, architect Giovanni Pace’s stunning refurbishment of an historic coaching inn where Napoleon Bonaparte supposedly overnighted. And, in the pop of an effervescent bubble, the region has its first modern five-star hotel (with the area’s only destination spa) as golden and whimsical as its namesake sparkler. Blonde wood and glass walls render the whole triple-deck interior Champagne-colored and the golden-leafed sculpture hanging in the atrium is truly lovely. Very large bedroom terraces, indoor and outdoor pools and jacuzzi all offer panoramic views of the world-famous (and now UNESCO World Heritage-listed) vineyards, while the top-floor bar has access to the cellar's 257 different Champagnes, as well as views that look over the vineyards. Restaurant Le Royal, with its giant images of Napoleon’s women and witty plates decorated with excerpts from his love letters, won a Michelin star within six months of opening; the casual restaurant, also overseen by chef Jean-Denis Rieubland, glitters beneath crystal pendants intended to evoke the gloss of Champagne. Everything, including the giant indoor pool, its tiles the turquoise of a mermaid’s tail, glows, but the effect is unexpectedly restful: even guests who don’t take advantage of a Biologique Recherche treatment will leave restored. But you’re here to drink Champagne in Champagne, which calls for a little bit of bling and indulgence. Borrow an electric bike for an effortless cycle through those steep vineyards to a glass of Champagne in Hautvillers, its supposed birthplace.",
                        "price": "1308$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f68c458987090832029b2fa/master/w_400%2Cc_limit/royal-champagne-hotel.jpg"
                    },
                    {
                        "id": 26,
                        "title": "andBeyond Ngorongoro Crater Lodge — Ngorongoro, Tanzania",
                        "description": "The Ngorongoro Crater contains one of the world's greatest concentrations of wildlife (and Africa's highest concentration of lions) within its massive walls, making it one of the most enviable safari destinations on the entire continent. Ngorongoro Crater Lodge lets you wake up right in the midst of all that majesty, in one of 30 suites decked out with banana-leaf roofs, crystal chandeliers, and leather armchairs. Let the staff take you on game drives (complete with Swarovski binoculars) and meet-and-greets with the local Maasai and Hadzabe tribes before enjoying a holistic massage in your room, all capped off with a hot tea brought to your bed by a private butler. Think of it as Masai meets Versailles.",
                        "price": "1423$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f68c5c1987090832029b2fc/master/w_400%2Cc_limit/andbeyond-ngorongoro-crater-lodge.jpg"
                    },
                    {
                        "id": 27,
                        "title": "The Nai Harn Phuket — Phuket, Thailand",
                        "description": "Located on one of Phuket's best beaches, The Nai Harn Phuket is everyone you could possibly want from a 5-star Thai resort. Built almost like a Greek hotel, with white exteriors and climbing pink bougainvillea, the property's guest rooms are plush and luxurious, and most of them offer panoramic views over the bay from a private terrace. The oversized king-size beds are impossibly comfortable, but you'll definitely want to rise early to take advantage of the resort's menu of activities. There's the aforementioned Nai Harn beach, for starters, where you could spend the better part of a day snorkeling or lounging on the white sand. Then there is the lovely swimming pool, daily yoga classes, and six-room spa to fill the rest of your hours—the ones not devoted to eating, that is. Those belong to the on-site restaurants and bars, where you can find everything from rooftop sushi to Mediterranean cuisine served right by the waters of the Andaman Sea.",
                        "price": "527$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f68c911b981fb78a3045fa6/master/w_400%2Cc_limit/the-nai-harn-phuket.jpg"
                    },
                    {
                        "id": 28,
                        "title": "Capella Lodge — Lord Howe Island, Australia",
                        "description": "Capella’s biggest drawing card is the only one that matters on this World Heritage Site island 485 miles east of Sydney: location. Situated on Lord Howe’s stunning southern end, the nine-room Capella is the island’s only luxury lodge with beach, lagoon, and mountain views. What it lacks in opulence (bathrooms are merely functional), it more than makes up for in superb service, loads of beach-shack chic, and an air of absolute privacy. Visitors, who arrive on a Dash-8 twin-propeller plane, will find themselves catapulted back in time: no cell phone reception, no traffic lights, no cats (the scourge of Australasia’s birds), a speed limit of 15 miles per hour, and a cap of 400 tourists at a time. This 50-square-mile crescent in the Pacific has the southernmost coral reef in the world and a wealth of wilderness walks that include everything from primeval banyan forests to endangered ground-dwelling birds.",
                        "price": "1278$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f68cb1168f371240312a119/master/w_400%2Cc_limit/capella-lodge-lord-howe-island.jpg"
                    },
                    {
                        "id": 29,
                        "title": "Eden Rock - St Barths —St. Barts",
                        "description": "Even if you've become a bit numb to the beauty of St. Barts over the years, pulling into Eden Rock will still elicit a reaction. It's just so perfect—so chic, so glamorous, but in this really easy, island-appropriate way. The hotel sits on a point and is almost entirely surrounded by calm, gin-bottle-blue water. Many of the rooms are built into the rock and are simultaneously elegant and cozy. It's the type of place that, just being there, makes you feel like the most glam, sun-kissed version of yourself. It sounds silly, but you feel a little famous when you're there. The rooms are lovely and private, and you could have a delightful breakfast by your private pool, but the people-watching here is too good—you'd be missing an opportunity if you stayed in room. Also, the breakfast spread is insane in scope and quality; don't miss it. Rockstar chef Jean-Georges Vongerichten is in charge of the menu at the main restaurant, Sand Bar, which, apparently, once it is reopened, will take cues from Vongerichten's ABC and ABCV restaurants.",
                        "price": "1029$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f68d7ce755749175364503c/master/w_400%2Cc_limit/eden-rock-st-barths.jpg"
                    },
                    {
                        "id": 30,
                        "title": "The Vines Resort & Spa — Tunuyan, Argentina",
                        "description": "At The Vines, legendary chef Francis Mallmann sources many of his ingredients locally—after all, locavorism has always been a part of life in rural Argentina. The hotel's restaurant, Siete Fuegos, or “Seven Fires,” alludes to his philosophy of open-flame cooking, rendering mouthwatering dishes like the asado steak slathered with mascarpone and rolled with layers of yam chips, tomato, and avocado. All 22 villas have modern kitchens featuring refrigerators packed with goodies, private patios, and spa-style bathrooms. You can even play winemaker by purchasing a plot of land on-site whose cultivation is overseen by the resort’s agronomist. What better excuse to keep coming back?",
                        "price": "1327$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f68d8c1978ff785b250165c/master/w_400%2Cc_limit/vines-resort-and-spa-mendoza.jpg"
                    },
                    {
                        "id": 31,
                        "title": "Tutka Bay Lodge — Homer, Alaska",
                        "description": "On the tip of the Kenai Peninsula, across Kachemak Bay from Homer, Tutka is owned by chef Kirsten Dixon and her husband Carl. It combines a wilderness lodge experience with outstanding sea-to-table food (with guests able to participate in fishing, foraging for herbs and berries, and digging for clams or harvesting mussels). Kayaks make it easy to explore the miles-long fjord on your doorstep, and hiking trails meander through forests of old-growth spruce. With only six cabins, the lodge can often feel entirely yours.",
                        "price": "1406$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6a659a7dadd5092527e474/master/w_400%2Cc_limit/Tutka-Bay-Lodge.jpg"
                    },
                    {
                        "id": 32,
                        "title": "Uxua Casa Hotel & Spa — Trancoso, Brazil",
                        "description": "Surrounded by dense rainforest and teetering high on a ridge overlooking the powder-sand-fringed Atlantic, Uxua fits right into the post-hippie utopia of Trancoso. Working with local artisans, Dutch owner Wilbert Das (Diesel’s former creative director) has turned the hotel into a collection of rustic renovated casas, cottages, an intimate treehouse, and a tribal-inspired spa. All are cloaked by hummingbird-flecked tropical gardens and centered around a pool lined with green aventurine quartz, which, for those not up on their healing crystals, is said to be very therapeutic. Interiors are haute-boho: roomy indoor-outdoor sitting rooms and airy living spaces with dazzling-white walls and muslin-canopied beds, accented with lots of reclaimed wood, antiques, and vintage finds including brightly painted Virgin Mary statuettes. A decked path runs through mangrove forests to the beach, where there are enormous day beds for post-breakfast snoozing and a beach bar fashioned from an old fishing boat—just stay horizontal and another Caipirinha will soon find its way to you.",
                        "price": "1532$",
                        "imageUrl": "https://media.cntraveler.com/photos/5c09a19f7732ca62ae9f7399/master/w_400%2Cc_limit/UXUA%2520CASA%2520HOTEL%2520_%2520SPA__2018_790.jpg"
                    },
                    {
                        "id": 33,
                        "title": "Singita Sabi Sand - Boulders Lodge — Sabi Sand, South Africa",
                        "description": "Singita Sabi Sand includes three well-appointed options—Ebony Lodge, Castleton Camp, and Boulders Lodge—that provide an elegant base from which to bask in natural beauty of one of South Africa's most renowned game reserves. Boulders Lodge was named after the ancient boulders strewn along the banks of the Sand River, and the rocks provided design inspiration for the resort, too. The 12 glass-fronted suites have artfully pared-down interiors, featuring fossilized tree stumps and other found objects; but you can still expect luxurious, colonial-style touches like private plunge pools and four-poster beds. But the main draw here is, of course, the wildlife. Even when you aren't on a guided game tour, you can experience African fauna at every turn, whether it's seeing crocodiles from your deck or hearing hippos snorting outside your room at night.",
                        "price": "1440$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6a67bbc9adbe3abc90a2c9/master/w_400%2Cc_limit/singita-sabi-sand-boulders-lodge.jpg"
                    },
                    {
                        "id": 34,
                        "title": "Singita Pamushana Lodge — Malilangwe Wildlife Reserve, Zimbabwe",
                        "description": "In a landscape inhabited by black and white rhinos, kudu, and predator cats, the thatched main lodge and six villas of Singita Pamushana Lodge overlook Malilangwe Lake. (A seventh villa, with five bedrooms and a James Bond-ish disappearing window, was exclusively used by the lodge’s owner until recently.) Singita does not skimp when it comes to accommodation standards. Their lodges are some of the most luxurious and sensitively designed in Africa, and Pamushana is no exception. Service is excellent and the food on a par with the top restaurants of Cape Town. Each villa has a lofty ceiling, a huge shower tiled by a local artist, and a plunge pool with a sweeping view. Sandstone fireplaces and walls painted in chevrons are in harmony with fabrics that, with the carved artwork, remind you that Zimbabwean handicrafts and handiwork are among Africa’s best. Those wary of the steep rates should note that all of the profits go back into the community, to a program that feeds 19,000 kids a day, and to rehabilitating this former hunting ground. Until Zimbabwe’s economy comes around, all the ingredients for your meals—tuna steak, vegetable aspic, artichoke salad—arrive via charter plane from South Africa. The coffee, though, is local and good.",
                        "price": "558$",
                        "imageUrl": "https://media.cntraveler.com/photos/5ed1644ca7f602bbfd7ccf8d/master/w_400%2Cc_limit/Singita-Malilangwe-House-Master-suite-shower-with-view.jpg"
                    },
                    {
                        "id": 35,
                        "title": "Auberge du Soleil, Auberge Resorts Collection — Rutherford, California",
                        "description": "This outstanding Napa Valley hotel is set on 33 acres of vineyards and olive groves—needless to say, the views are spectacular. Sumptuous cottages done in sun and earth tones have wood-burning fireplaces and refrigerators stocked with local wines and cheeses; bathrooms come with skylights and flat-screen TVs. The restaurant serves wine-country cuisine with French Mediterranean influences, and its terrace has heaters for dining out on cool evenings. Enjoy Italian ices and chilled towels at the pool and Reiki at La Pagode, an Asian-style pavilion.",
                        "price": "1492$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6a69789a18c4ed58dd37f7/master/w_400%2Cc_limit/auberge-du-soleil.jpg"
                    },
                    {
                        "id": 36,
                        "title": "Oliver's Camp — Tarangire Nation, Tanzania",
                        "description": "Asilia Africa, an East Africa-focused safari company, has 23 safari camps spread out in Tanzania and Kenya. Oliver's Camp, located in Tanzania's Tarangire National Park, was one of their first, dating back to 1992. It's been a go-to on the East Africa safari circuit ever since, with 10 beautifully appointed tents and prime access to wildlife spotting. The tents all include en-suite bathrooms, as well as running water and multiple showers, so you won't be roughing it here. Oliver's Camp is known for their walking safaris—a rare chance to get out of the vehicle with a guide. Most days at Oliver's Camp include morning drives, afternoon tea, sundowners, and an evening drive, as well as plenty of down time and stargazing at night. And it's a great option for families, as children five and above are welcome.",
                        "price": "831$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6aacc1df42258e52b72870/master/w_400%2Cc_limit/olivers-lodge.jpg"
                    },
                    {
                        "id": 37,
                        "title": "Likuliku Lagoon Resort — Malolo Island, Fiji",
                        "description": "We’re not saying we want to have a Tom Hanks-and-Wilson moment at Likuliku Lagoon Resort—but we’re also not saying we don’t. We’d happily give it all away for a stay at this drop-dead gorgeous island retreat, where barefoot luxury and a belly full of fresh fish are the only orders of the day. You can’t go wrong with room selection, with traditional \"bures\" clustered either along the beach or strung above the lagoon, the latter accessible only by a wobbly wooden gangplank. Besides location, all that distinguishes huts are private plunge pools and outdoor showers (for those who like a little island breeze where the sun don’t shine). Standouts are the service—expect staff to remember your name, what time you roll out of bed, and how you like your joe—and the food, which is swept into your daily tariff. Chef Shane’s Fijiana, the on-site restaurant, serves up Indian- and Chinese-inspired cuisine via a menu that changes daily—one evening, you’ll inhale a plate of salt and pepper snapper, sprinkled liberally with shreds of green papaya, tamarind sauce, and a spritz of lime, and the next, a crispy kaarage fried chicken coated in hot mustard, pickled ginger, and nori seaweed. Still hungry? The daily continental breakfast buffet deals in fresh-squeezed juice, towers of tropical fruit, and flaky pastries, breads, and yogurts, though we’ll go to bat for the poached mud crab omelette—and tell Shane not to be shy with the chili and papaya relish. Sundays are for family-style Magiti Banquets. When you’re not cracking jokes over piña coladas at Masima or Dua Tale, try tagging along for a jet ski tour of Mondriki Island (of Castaway fame), or hug a paddle board on the azure ocean waters.",
                        "price": "1326$",
                        "imageUrl": "https://media.cntraveler.com/photos/57a4b01b42b3491d7ea73e50/master/w_400%2Cc_limit/Tout1-LikulikuLagoonResort-Fiji-CRHotel.jpg"
                    },
                    {
                        "id": 38,
                        "title": "Le Barthélemy Hotel & Spa — St. Barts",
                        "description": "A relatively new addition to St. Barts' luxury hotel scene, and in keeping with the island's low-rise sensibility, Le Barthélemy is a sophisticated winner. Set between a lagoon and Grand Cul-de-Sac beach along the island's northeastern shore (with jaw-dropping views of offshore islets and distant St. Maarten), the hotel is an education in understated elegance. Rooms are spare and enormous, with lots of wood and one or two pops of bright color—some even have small, rectangular plunge pools for mini-laps. The food at Aux Amis is unabashedly modern French, with attention paid to proper portions in the tropics: in other words, not too much. Water sports enthusiasts have an expanse of calm shallow waters for kayaking, kite-surfing, and snorkeling—a flotilla of a dozen sea turtles that survived the storms of 2017 remain in residence and are easily visible.",
                        "price": "1385$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6abb5a4297925b041ef2b9/master/w_400%2Cc_limit/le-barthelemy.jpg"
                    },
                    {
                        "id": 39,
                        "title": "Matakauri Lodge — Queenstown, New Zealand",
                        "description": "It’s possible New Zealand’s early settlers spotted the mountains they would later name \"The Remarkables\" from the lakefront where Matakauri now sits. We wager a case of Otago Pinot that the word \"remarkable\" will come to mind, too, when gazing out at that magnificent crown of peaks standing like steely soldiers from the glass walls at Matakauri’s Owner’s Cottage. What makes New Zealand’s perennial luxury lodge so stand out, however, is not so much the beauty of that epic nature it frames so stylishly from its sun flooded, white-on-white rooms, but rather, the comfort, service, and food to match. And the bar, as set by God with this one, is very high. Fresh water aoraki salmon from lakes carved into New Zealand’s highest peak, Mount Cook, stars alongside local mushrooms and crispy-skinned duck legs at dinner. Wash it down with an Amisfield Chenin Blanc; the team can arrange tastings at the nearby Gibbston Valley, one of the country’s hottest boutique wine districts. Of course, there’s plenty to do on those peaks as well. Take a chopper heli-skiing or head out on an all-day hike in warmer months for phenomenal views down onto Lake Wakatipu. Push yourself on that climb, for there are few sweeter rewards than an after-hike soak in a deep tub, rightly placed against that gorgeous glass wall. Matakauri is the embodiment, from the design to the nature, of New Zealand’s own brand of luxury.",
                        "price": "1001$",
                        "imageUrl": "https://media.cntraveler.com/photos/5defc7135b843b0009f3b112/master/w_400%2Cc_limit/Matakauri-Lodge_2019_matakauri-lodge-winter.jpg"
                    },
                    {
                        "id": 40,
                        "title": "Bisate Lodge — Volcanoes National Park, Rwanda",
                        "description": "Pint-size Rwanda has become one of Africa’s most buzzed about—and exclusive—destinations, and nowhere more so than the gorilla-rich Virunga Mountains. Top-notch operators Singita and One&Only have opened here, and very lovely they are, but Wilderness Safaris’ Bisate Lodge was the original. Arranged like giant birds’ nests around the natural amphitheater of an eroded volcanic cone, its six thatched pods are inspired by the former royal palace in the southern city of Nyanza. Inside, the swooping ceilings and woven-grass walls curve around to huge windows with knockout views of the peaks where Dian Fossey studied gorillas. ",
                        "price": "987$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6abcf54297925b041ef2bb/master/w_400%2Cc_limit/bisate-lodge-rwanda.jpg"
                    },
                    {
                        "id": 41,
                        "title": "Chamilandu, The Bushcamp Company — South Luangwa National Park, Zambia",
                        "description": "The Bushcamp Company is the only operator in the pristine southern section of of Zambia’s South Luangwa National Park, which means you'll get a truly unspoiled experience here. Accommodations come in the form of three stilted treehouses (yep, only three—there will never be more than six guests around at a time) that overlook the Luangwa River and the Chindeni Hills, providing bird's-eye views of the bathing elephants and hippos below. Each house comes equipped with four-poster beds made up with soft linens, and every one of the river-facing walls are completely open (as are the showers), allowing the dry breezes to keep guests cool at night. ",
                        "price": "1416$",
                        "imageUrl": "https://media.cntraveler.com/photos/5d9a922414e64300087b026b/master/w_400%2Cc_limit/Chamilandu-Bushcamp_2019_Chanalandu-2016-06-35.jpg"
                    },
                    {
                        "id": 42,
                        "title": "Morukuru Family Beach Lodge — De Hoop Nature Reserve, South Africa",
                        "description": "Say you're more of a beach bum than a safari enthusiast—don't worry, South Africa still has you covered. Head to the intimate five-suite Morukuru, about three hours east of Cape Town on the shore of the Indian Ocean. There are white sand beaches, of course, but also access to the De Hoop Nature Reserve with its zebra and bontebok and protected marine area. You can simply chill on the beach or by the lodge's pool, but we'd suggest letting Morukuru's friendly, attentive staff fill your day with game drives through the reserve, mountain biking, sandboarding, snorkeling, and more. (All activities, gear, and meals are included.) Plan your trip during South Africa's winter (July-October) for prime southern white whale watching from shore, from the lodge's restaurant, and even from your bed.",
                        "price": "543$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6abdf37dadd5092527e47c/master/w_400%2Cc_limit/Morukuru-Beach-Lodge.jpg"
                    },
                    {
                        "id": 43,
                        "title": "Singita Grumeti —Grumeti Game Reserve, Tanzania",
                        "description": "Singita Grumeti is made up of four permanent properties and one mobile camp –  Sasakwa Lodge, Sabora Tented Camp,  Faru Faru Lodge, Serengeti House and Singita Explore – all set within 350,000 acres of land adjoining Serengeti National Park. Sasakwa Lodge, the most sumptuous, comprises nine cottages suites and one villa styled as colonial manor houses, with fireplaces, antique bath tubs, a wraparound veranda, a plunge pool, and Wi-Fi. Between game drives, guests can smoke complimentary cigars at the main lodge’s bar, take tea in the garden sunroom, shoot billiards on a nineteenth-century table, and make free satellite phone calls; other diversions include an archery range and a stable of horses for gallops alongside the herds. On an open plain, Sabora has nine tents furnished with antiques from an English lord’s East African campaign in a 1920s style. Faru Faru’s eight tents sit in wooded country by the Grumeti River. A return to the very essence of safari, Singita Explore is a private camp that moves according to where the best game viewing is within the Grumeti Reserves and provides access to the most remote and beautiful locations. Singita Serengeti House, is an exclusive-use retreat designed to welcome friends and families to a relaxed home away from home. Up to eight guests can stay at Serengeti House and they can choose between the two suites in the main house or the two garden suites situated on either side.",
                        "price": "163$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6ac0ca4ca0cc3eae33d0a7/master/w_400%2Cc_limit/singita-grumeti-sabora.jpg"
                    },
                    {
                        "id": 44,
                        "title": "Twin Farms — Barnard, Vermont",
                        "description": "Twin Farms, an 18th-century Southern Vermont farmhouse that once belonged to Nobel Prize-winning writer Sinclair Lewis, is the perfect spot to get away from the city and relax amid maple and pine trees. Our readers laud the first-rate service at this rural retreat.  One of only a handful of Relais & Chateaux properties in New England, the food here is superb, with chef Nathan Rich putting together a highly seasonal menu drawn from Vermont produce, meats, and dairy. Beyond the dining room, there’s a guide readily available for walks through the surrounding woods, an on-call chauffeur for local outings, and even someone to bring you milk and cookies at any hour.",
                        "price": "1234$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6ac253df42258e52b72872/master/w_400%2Cc_limit/twin-farms-vermont.jpg"
                    },
                    {
                        "id": 45,
                        "title": "Naladhu Private Island Maldives — Veligandu Huraa, Maldives",
                        "description": "With only 19 expansive guest quarters in South Malé Atoll, this intimate resort provides a level of privacy and personal attention impressive even in the Maldives. Weathered-wood accommodations come with a private garden and an infinity pool, high-ceilinged interiors decorated in cane and tropical hues, and an open-air bathroom with L’Occitane products and a sea-facing tub for two. The Living Room’s dining spaces range from tables set around the all-glass wine cellar to cushioned Indian daybeds under the stars, and a fleet of dhonis adds onboard private dinners. Dedicated butlers, or VGCs (very good chaps), exceed expectations with quiet, smiling service. With a location only a 30 minute speedboat ride from Malé’s international airport, Naladhu represents the Maldives’ most convenient exclusive destination yet.",
                        "price": "426$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6ac3279a18c4ed58dd37fd/master/w_400%2Cc_limit/Naladhu-Private-Island-Maldives.jpg"
                    },
                    {
                        "id": 46,
                        "title": "Anantara Chiang Mai Resort — Chiang Mai, Thailand",
                        "description": "Anantara has upped the ante in this posh town on the Mae Ping River. The 84 sleek rooms, protected from urban noise by two sets of thick doors, have sweeping floor-to-ceiling views of Thai river life. (There are also 24 serviced suites just across the road, which are optimal for families or extended stays.) Daybeds indoors and out are a relaxing pleasure, as are teak chaises by the riverfront pool. The hotel wraps around the open-air restaurant, where an East-meets-West menu is served all day long—think a breakfast buffet, loaded with fruits and juices, and later, flavorful plates of Kashmir chili and Indian spice–marinated chicken. A wrought iron staircase twists up to the rooftop bar. If you're looking to spice up your staid vacation itinerary, activities worth booking include a Muay Thai kickboxing class and a sunset river cruise.",
                        "price": "399$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6ac3e34ca0cc3eae33d0a9/master/w_400%2Cc_limit/Anantara-Chiang-Mai-Thailand.jpg"
                    },
                    {
                        "id": 47,
                        "title": "The Nautilus Maldives — Maldives",
                        "description": "The Maldives, a collection of sand-rimmed islets in the Indian Ocean, is the long-haul beach destination Americans need to start paying more attention to. Especially with its bevy of hot new hotel openings, like The Nautilus, which swung open its doors in February 2019. The property kept things “traditional,” which means one thing when it comes to Maldivian resorts: private bungalows. The 26 houses—some of which sit just off of the beach, while others stretch over the water—all come with private pools, a separate living quarter, and personal butler service. The resort specializes in bespoke vacations, meaning you get to craft your stay to look exactly as you dreamed it: Champagne in bed? Breakfast aboard a luxury yacht? An impromptu swim with manta rays? It's all possible here.",
                        "price": "1335$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6ac4957dadd5092527e47e/master/w_400%2Cc_limit/the-nautilus-maldives.jpg"
                    },
                    {
                        "id": 48,
                        "title": "The Mulia & Mulia Villas — Bali, Indonesia",
                        "description": "The 219-room seaside Mulia & Mulia Villas in the southeastern tourist enclave of Nusa Dua is one of our readers' favorite resorts in Asia for a reason: The Indian Ocean is just steps away. The 20-room spa is well equipped to cure whatever ails you, from a Finnish wood sauna to a steam room, not to mention Bali's first (and presently, only) ice fountain room, set to 30 degrees Fahrenheit. Within the spa, there are also both hot and cold water pools for you to alternate between—and the shock to your system is one way to get that circulation going, if you'd rather not hit the fitness center. Alternately, spend a leisurely Sunday afternoon over brunch at Soleil, a Mediterranean spot infused with Vietnamese, Indonesian, and Thai flavors, where you can indulge in a generous spread of meats, grilled seafood, and an epic dessert buffet.",
                        "price": "272$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f6ac5484ca0cc3eae33d0ab/master/w_400%2Cc_limit/the-mulia-bali.jpg"
                    },
                    {
                        "id": 49,
                        "title": "L'Horizon Resort & Spa — Palm Springs, California",
                        "description": "“There were a lot of fun hotels in Palm Springs, but there weren’t any great ones, and I wanted to change this.” So says Steve Hermann, the L.A.-based residential designer who spent the two years (and millions of dollars) turning the historic William F. Cody–designed L’Horizon into a luxurious boutique hotel. Hermann didn’t alter the footprint much—the main house and 25 bungalows were built in 1952 as a vacation spot for Hollywood producer Jack Wrather (of Lassie; The Lone Ranger fame)—but he added an open-air spa and an alfresco restaurant and gut-renovated the interiors. Hermann wanted the decor to work with the mid-century architecture without creating a time warp. As such, each bungalow is a mix of modern (custom hair-on-hide rugs, industrial-chic machined brass lighting and fixtures) and vintage (furniture from Percival Lafer, Mullhauser, Knoll, and Katavolos). The result is in keeping with the original purpose of Cody’s design and Hermann’s background—more luxe residential than hotel, heightened by touches like monogrammed stationery and door plaques inscribed not with room numbers but with guests’ names. And while it is a fun hotel, more private club than frat party, it’s also a place for quiet indulgences: The pool is guests-only; unexpected treats are brought to your room every afternoon (could be a scoop of ice cream, could be a shot of tequila); and roaming poolside therapists offer complimentary foot and shoulder massages. Request a west-facing bungalow with an outdoor shower and watch the sun go down over the San Jacinto Mountains while shampooing.",
                        "price": "786$",
                        "imageUrl": "https://media.cntraveler.com/photos/5f760ddda2088ffe71d15f30/master/w_400%2Cc_limit/DSC04555.jpg"
                    }
                ]);
            } else {
                reject({message: 'fetch tours error'})
            }
        }, timeout);
    })
}
//fake api call


class Data {
    tours: ITour[] = [];
    currentPage: number = 1;
    countCardsOnPage: number = 9;

    constructor() {
        makeAutoObservable(this);
        //ця штука ставить всі анотації за нас
    }

    fetchTours = async () => {
        try {
            this.tours = await fetchTours(true, 50);
        } catch (e) {
            console.error(e.message)
        }
    }

    sort = (direction: string) => {
        const sortedTours = [...this.tours];
        if (direction === 'asc'){
            sortedTours.sort((a, b) => Number.parseInt(a.price) - Number.parseInt(b.price))
        } else if (direction === 'desc') {
            sortedTours.sort((a, b) => Number.parseInt(b.price) - Number.parseInt(a.price))
        }
        this.tours = sortedTours;
    }

    getOneTour = (id: number): ITour | string  => {
        const foundTour = this.tours.find(value => value.id === id);
        if (foundTour) {
            return foundTour;
        }
        return "Tour is not found"
    }
    //<button onClick={() => {console.log(mobx.toJS(data.getOneTour(10)))}}>test</button>


    // filterToursByPrice = (from: number, till) => {
    //
    // }

    //pagination
    get currentTours(): ITour[] | null {
        if (this.tours.length === 0) return null;
        const begin = this.countCardsOnPage * (this.currentPage - 1);
        const end = this.countCardsOnPage * this.currentPage;
        return this.tours.slice(begin, end)
    }

    incrementPage = (): void => {
        this.currentPage = this.currentPage + 1;
    }

    decrementPage = (): void => {
        this.currentPage = this.currentPage - 1;
    }

    changeCurrentPage = (n: number): void => {
        this.currentPage = n;
    }

}

export default new Data();
