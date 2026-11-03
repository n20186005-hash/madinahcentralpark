import type { GuideTranslation } from '../../../lib/parkGuide';

export const logisticsEn: Record<string, GuideTranslation> = {
  'airport-transfer': {
    title: 'Getting to King Fahad Central Park from Madinah Airport',
    h1: 'Getting from the airport to the park',
    subtitle: 'Transfer options from Prince Mohammad bin Abdulaziz International Airport, what is documented and what needs checking',
    description:
      'How to reach King Fahad Central Park from Madinah Airport: the transfer options available, what official bodies publish on fares and timing, and how to handle luggage and family on your first day.',
    keywords: [
      'Madinah airport to King Fahad Central Park',
      'taxi from Madinah airport',
      'transfer from Prince Mohammad bin Abdulaziz Airport'
    ],
    lede:
      'The airport is a typical first stop for a visitor who lands and wants to rest, and the park is a good evening destination for a first night in Madinah. The practical decision here is the type of transfer, and whether it is published by an official body or is a third-party estimate.',
    quickFacts: [
      { label: 'Travel time to the city centre', value: 'About 30 minutes according to Tibah Airports' },
      { label: 'Taxi', value: 'Official fare list by zone' },
      { label: 'Ride-hailing apps', value: 'Service advertised in Madinah around the clock' },
      { label: 'Park timing', value: 'Evening, per the official description' },
      { label: 'Route 400 bus', value: 'Airport ↔ Prophet\'s Mosque, around the clock and roughly every 40 minutes' },
      { label: 'Park-zone taxi fare', value: 'About 18.5 km: SAR 55 (5 seats) / SAR 70 (7 seats)' }
    ],
    sections: [
      {
        heading: 'Three practical options',
        paragraphs: [
          'There are essentially three ways to get from Madinah Airport into the city, each with a clear use case.'
        ],
        bullets: [
          'Licensed taxi: a fare published by the airport operator by zone; best with family and luggage.',
          'Ride-hailing apps: a service advertised in Madinah around the clock; useful when your drop-off point inside the park is clear.',
          'Rental or private car: best if your plan covers more than one stop on the same day.'
        ]
      },
      {
        heading: 'Travel time',
        paragraphs: [
          'Tibah Airports states that reaching the city centre takes about thirty minutes. The correct reading of that figure is that it is an estimated time to the centre of the city, not to the park specifically.',
          'The park lies about five kilometres south of the Prophet\'s Mosque according to the official description, so allow a little extra time if the park is your direct destination.'
        ]
      },
      {
        heading: 'Fare and pricing',
        paragraphs: [
          'The airport operator publishes an official taxi fare list for trips from and to the airport by zone, and warns against unlicensed transport. Rely on the published list or on the fare shown in the app before setting off.',
          'This page does not single out one trip fare, because prices change and the official list itself is the correct and current reference.'
        ]
      },
      {
        heading: 'Why not head straight to the park',
        paragraphs: [
          'After a flight, an arrival and your luggage, moving straight into a space of nearly 1.6 million square metres is tiring. It is better to leave the park for the evening once you have settled, especially as it is officially described as opening in the evening.',
          'This also gives you a chance to learn which gate and car park are closest to your hotel before you go.'
        ]
      },
      {
        heading: 'What to check',
        paragraphs: [
          'Check the road conditions on your arrival day, and whether a major event in the city might increase traffic. Confirm which gate you will arrive at in the park, because it is large and has several entrances, and a clear meeting point saves a long walk.'
        ]
      },
      {
        heading: 'Route 400 between the airport and the Prophet\'s Mosque',
        paragraphs: [
          'Alongside taxis and ride-hailing, there is an advertised bus service linking the airport with the Prophet\'s Mosque (Route 400), described as running around the clock at roughly one trip every forty minutes.',
          'This option suits travellers wanting a lower cost whose destination is near the Prophet\'s Mosque, from where you can reach the park by a short taxi ride. Note, however, that the advertised fare for this route conflicts between sources: some data indicate about SAR 11.50 and others about SAR 3.45, a wide gap.',
          'Because those figures come from third-party sources that change, none can be treated as definite; what counts is the official fare shown at the point of purchase on the day of travel.'
        ]
      },
      {
        heading: 'The fare zone covering the park area',
        paragraphs: [
          'The official airport taxi fare is divided by zone, and the zone covering the park area is about 18.5 km. The official list gives this zone two categories: SAR 55 for a five-seat car and SAR 70 for a seven-seat car.',
          'Important note: the two published versions of the fare list (Arabic and English) do not match in the order of zones and prices, so the Arabic text is taken as the official local version, and the fare should be confirmed when boarding.'
        ],
        bullets: [
          'The zone covering the park area: about 18.5 km.',
          'Five-seat category: SAR 55 per the official list.',
          'Seven-seat category: SAR 70 per the official list.',
          'Conflict note: the English version of the list does not match the Arabic, and the Arabic text prevails.'
        ]
      },
      {
        heading: 'The official warning against unlicensed transport',
        paragraphs: [
          'The airport operator warns against unlicensed transport and calls for using approved operators only. This matters because some unofficial offers appear at the arrival halls at unpublished prices.',
          'Rule of thumb: use licensed taxis or well-known ride-hailing apps, agree the fare before setting off, and avoid sharing a ride with an unknown party or an undocumented offer.'
        ]
      }
    ],
    faqs: [
      {
        q: 'How long does it take from Madinah Airport to the city centre?',
        a: 'Tibah Airports states a time of about thirty minutes to the city centre, an estimate to the centre rather than to the park specifically.'
      },
      {
        q: 'Is there a published taxi fare from the airport?',
        a: 'Yes, the airport operator publishes a fare list by zone, with a warning against unlicensed transport. Rely on the published list or the fare shown in the app.'
      },
      {
        q: 'Are ride-hailing apps available in Madinah?',
        a: 'Uber is advertised in Madinah around the clock. Careem advertises coverage of many Saudi cities without naming Madinah, so the former is clearer in documentation.'
      },
      {
        q: 'Should I go to the park straight from the airport?',
        a: 'Not the best idea. It is more comfortable to settle first and then visit the park in the evening, especially as the official description says it opens in the evening.'
      },
      {
        q: 'Is there a bus from the airport to the park?',
        a: 'No published route ends at the park itself. The advertised route (400) links the airport with the Prophet\'s Mosque around the clock, roughly every forty minutes, and from there you reach the park by a short taxi ride.'
      },
      {
        q: 'How much is a taxi from the airport to the park area?',
        a: 'The official list gives the zone matching the park area (about 18.5 km) two categories: SAR 55 for a five-seat car and SAR 70 for a seven-seat car. The English version of the list differs from the Arabic, so the Arabic text is used and the fare is confirmed on boarding.'
      },
      {
        q: 'Is the Route 400 fare fixed?',
        a: 'The advertised figures conflict: some data indicate about SAR 11.50 and others about SAR 3.45. The fare shown at the point of purchase is what counts, not a figure published in third-party sources.'
      },
      {
        q: 'How do I avoid unlicensed transport from the airport?',
        a: 'The airport operator warns against unlicensed transport. Use licensed taxis or approved ride-hailing apps, agree the fare in advance, and avoid unpublished offers at the arrivals hall.'
      }
    ]
  },
  'haramain-train': {
    title: 'Haramain High Speed Rail to Madinah: Visitor Guide',
    h1: 'The Haramain train and the park',
    subtitle: 'Madinah station, the distance to the park, and how to plan a day arriving by train',
    description:
      'A guide to arriving in Madinah by train and then visiting King Fahad Central Park: the location of the Haramain station, its published parking and operating hours, the distance to the park, and how to plan arrival day.',
    keywords: ['Haramain train Madinah', 'Haramain station Madinah', 'train to Madinah'],
    lede:
      'The Haramain train makes arriving in Madinah fast and orderly, and its station there has published parking and operating hours. The practical question after you get off is a single one: how to arrange the rest of your day so you reach the park at its evening time.',
    quickFacts: [
      { label: 'Station', value: 'Madinah Station — Al-Aliyah/Al-Asbah (Al-Hadra)' },
      { label: 'Parking', value: 'About 1,000 spaces according to the operator' },
      { label: 'Published operating hours', value: 'About 06:30 to 00:30' },
      { label: 'Distance to the park', value: 'About 9 km to the station' },
      { label: 'Station address', value: 'Al Hadhra district, King Abdulaziz Road — postal code 42368' },
      { label: 'Distance to the airport', value: 'About 13 km from the station' }
    ],
    sections: [
      {
        heading: 'Station location',
        paragraphs: [
          'Madinah\'s Haramain station is located in the Al-Hadra area, referred to as Madinah Station on the network. The operator publishes daily operating hours and parking capacity of about a thousand cars.',
          'This makes the train a comfortable choice for those arriving from Jeddah or Makkah who then want to rent a car or use a ride-hailing app within the city.'
        ]
      },
      {
        heading: 'Distance to the park',
        paragraphs: [
          'The station is about nine kilometres from the park. That is a short-to-medium vehicle journey, not a walking route, especially with luggage and in Madinah\'s heat.',
          'Take a taxi or a ride-hailing app from the station forecourt, and give your destination using the park\'s official Arabic name or its map place card to avoid confusion.'
        ]
      },
      {
        heading: 'Planning arrival day',
        paragraphs: [
          'Since the train may arrive at any hour of operation, a flexible plan is best: settle first, then a nearby daytime stop, then the park in the evening.'
        ],
        bullets: [
          'Collect luggage and settle into your accommodation.',
          'A daytime cultural stop or a visit to the Prophet\'s Mosque depending on arrival time.',
          'Move to the park after the evening opening.',
          'A short tour and a seat and food, then return.'
        ]
      },
      {
        heading: 'Booking a ticket',
        paragraphs: [
          'Classes, prices and network stations vary, and the correct reference is the official Haramain High Speed Rail website and its timetable. Check the timetable before buying, because times are tied to all network stations, not to Madinah alone.',
          'Book ahead in peak seasons, as demand for the train rises in Ramadan and on holidays.'
        ]
      },
      {
        heading: 'What to check',
        paragraphs: [
          'Check your actual arrival time and the operating hours on the day of travel, parking availability, and return arrangements if you are leaving the same day. If you are using the train for a single day, it is best to make the park and its surroundings your only stop.'
        ]
      },
      {
        heading: 'Station address and details',
        paragraphs: [
          'The operator locates Madinah Station in the Al Hadhra district on King Abdulaziz Road, with postal code 42368 within its area — useful details if you want a ride-hailing app to drop you at the right door.',
          'Daily operating hours are given as roughly 06:30 to 00:30, with parking for about a thousand cars, which also serves those leaving their car while travelling.'
        ]
      },
      {
        heading: 'Three useful distances',
        paragraphs: [
          'When planning, three distances help: the station is about nine kilometres from the Prophet\'s Mosque and about thirteen kilometres from Prince Mohammad bin Abdulaziz International Airport.',
          'Since the park lies about five kilometres south of the Prophet\'s Mosque, the distance from the station to the park is a short-to-medium vehicle journey through the city centre, not one to walk with luggage.'
        ],
        bullets: [
          'Prophet\'s Mosque: about 9 km from the station.',
          'Prince Mohammad bin Abdulaziz International Airport: about 13 km from the station.',
          'The park: a short-to-medium vehicle journey through the city centre.'
        ]
      },
      {
        heading: 'Is the train enough for one day?',
        paragraphs: [
          'If your only stop is a visit to the park, the train brings you to the city and you then need a short local transfer; this suits those coming from Jeddah or Makkah the same day who want to finish the visit in the evening.',
          'Book ahead and check the timetable, because times are tied to all network stations, not to Madinah alone, and demand rises in Ramadan and on holidays.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Where is the Haramain station in Madinah?',
        a: 'Madinah Station is located in the Al-Hadra area, about nine kilometres from King Fahad Central Park.'
      },
      {
        q: 'Is there parking at the station?',
        a: 'The station operator mentions parking for about a thousand cars, with daily operating hours from early morning to after midnight according to the announcement.'
      },
      {
        q: 'How do I get from the station to the park?',
        a: 'By taxi or a ride-hailing app; the distance is about nine kilometres, a short-to-medium vehicle journey, not recommended on foot with luggage.'
      },
      {
        q: 'Should I visit the park right after getting off the train?',
        a: 'Better not directly. Settle first and then go in the evening, because the park is officially described as opening in the evening.'
      },
      {
        q: 'What is the address of the Haramain station in Madinah?',
        a: 'The operator locates it in the Al Hadhra district on King Abdulaziz Road, with postal code 42368 within its area.'
      },
      {
        q: 'How far is the station from Madinah Airport?',
        a: 'About thirteen kilometres according to the operator, against about nine kilometres to the Prophet\'s Mosque, so do not cover that distance on foot with luggage.'
      },
      {
        q: 'What are the station operating hours?',
        a: 'Daily hours are given as roughly 06:30 to 00:30, and the timetable should be checked on the day of travel.'
      },
      {
        q: 'Is there enough parking at the station?',
        a: 'The station parking is given as about a thousand cars according to the operator, generally sufficient outside peak times.'
      }
    ]
  },
  'ramadan-and-eid': {
    title: 'Ramadan and Eid at King Fahad Central Park, Madinah: Visitor Guide',
    h1: 'The park in Ramadan and Eid',
    subtitle: 'What is documented about seasonal events and transport, and what depends on last-minute announcements',
    description:
      'Arrangements for visiting King Fahad Central Park in Ramadan and Eid: the documented seasonal events, the Ramadan transport lines to the Prophet\'s Mosque, the best visiting times, and what to check.',
    keywords: ['King Fahad Central Park in Ramadan', 'Eid events in Madinah', 'visiting the park in Ramadan'],
    lede:
      'Ramadan and Eid change the rhythm of Madinah entirely: events appear and then end, and seasonal transport lines are added and then withdrawn. So this page does not offer a permanent schedule; it shows you where the official news is and how to build on it.',
    quickFacts: [
      { label: 'Documented event', value: 'Eid al-Fitr celebration at the park (10 April 2024) with fireworks' },
      { label: 'Rahaba festival', value: 'A Ramadan event in the heritage district in a specific season' },
      { label: 'Ramadan transport', value: 'Direct lines to the Prophet\'s Mosque including a stop at the park' },
      { label: 'Nature of the programme', value: 'Seasonal and changing, not a permanent schedule' },
      { label: 'Ramadan transport lines', value: 'Eight lines to the Prophet\'s Mosque from about 15:00 until one hour after Taraweeh' },
      { label: 'Ramadan hubs', value: 'The Sports Stadium, Shazah and the park' },
      { label: 'Season trips', value: 'More than 13,000 transport trips' }
    ],
    sections: [
      {
        heading: 'The rule for dealing with seasons',
        paragraphs: [
          'What is certain is that the park has hosted seasonal event programming, not that it has a fixed, published annual schedule. The distinction matters: relying on an assumed schedule could mean arriving to find no event.',
          'The practical rule: confirm the current season\'s announcement through official bodies before building your day around it.'
        ]
      },
      {
        heading: 'Eid',
        paragraphs: [
          'Madinah Municipality documented an Eid al-Fitr celebration at the park on 10 April 2024, including shows, children\'s activities and evening fireworks.',
          'This is a documented precedent showing the park is used as an official celebration space on Eid, but it does not mean the same programme repeats every year. Check the current year\'s announcement.'
        ]
      },
      {
        heading: 'Ramadan',
        paragraphs: [
          'The "Rahaba" festival in Madinah is mentioned as a Ramadan event within the heritage district, with times announced for a specific season rather than a permanent programme.',
          'The region\'s development authority also announced direct Ramadan transport lines to the Prophet\'s Mosque, including a stop at the park, running until one hour after Taraweeh. This is useful for those wanting to combine prayer and the park in the same evening.'
        ]
      },
      {
        heading: 'Best times to visit',
        paragraphs: [
          'In Ramadan, evening and night are the busiest in the city, and the park itself is officially described as opening in the evening. So the timing naturally aligns.',
          'Crowds rise after iftar and on Eid nights. If you have small children or want calm, choose a midweek night or the earliest time after opening.'
        ]
      },
      {
        heading: 'What to check',
        paragraphs: [
          'Check the current year\'s event announcements, the seasonal transport routes, stops and hours, and whether any facilities or gates might close during major events.'
        ],
        bullets: [
          'The municipality\'s and the region\'s development authority\'s announcement for the current season.',
          'Seasonal transport stops and the last trip time.',
          'Parking conditions on peak nights.',
          'Any special arrangement for entering events.'
        ]
      },
      {
        heading: 'Ramadan transport lines in detail',
        paragraphs: [
          'The Madinah Region Development Authority announced Ramadan transport lines direct to the Prophet\'s Mosque, given as eight routes serving pilgrims, running from about 3 p.m. (15:00) until one hour after Taraweeh prayer.',
          'One of these routes departs from the "park" (Al-Hadiqah) stop, making it possible to move between the park and the Prophet\'s Mosque in the same evening without a private car.',
          'Three main hubs are given for these lines: the Sports Stadium (Al-Istad Al-Riyadi), Shazah and the park, so you can set off from the hub closest to where you are staying.'
        ],
        bullets: [
          'Eight lines to the Prophet\'s Mosque according to the announcement.',
          'Operation from about 15:00 until one hour after Taraweeh.',
          'One of the lines departs from the "park" stop.',
          'Three main hubs: the Sports Stadium, Shazah and the park.'
        ]
      },
      {
        heading: 'Peak-season traffic volume',
        paragraphs: [
          'The announcement mentions operating more than 13,000 transport trips during the Ramadan season, an indicator of the sheer volume of movement rather than fixed timetables to rely on year after year.',
          'Practically: expect congestion on routes near the Prophet\'s Mosque and the park after iftar, and allow extra time for every transfer on peak nights.'
        ]
      },
      {
        heading: 'Details of the documented Eid celebration',
        paragraphs: [
          'Madinah Municipality documented the Eid al-Fitr celebration inside the park, which included a dedicated children\'s area, handicraft and handmade-goods stalls and a food area.',
          'This description shows the practical shape of the park\'s use on Eid: a family space, children\'s programmes and food service, not merely a photo spot. Even so, the programme remains seasonal and is announced separately each year.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Are there Eid events at the park?',
        a: 'The municipality documented an Eid al-Fitr celebration at the park on 10 April 2024 with fireworks, evidence of seasonal events rather than a fixed programme that repeats every year.'
      },
      {
        q: 'Is there Ramadan transport to the park?',
        a: 'The region\'s development authority announced direct Ramadan lines to the Prophet\'s Mosque including a stop at the park, running until one hour after Taraweeh according to the announcement.'
      },
      {
        q: 'What is the best time to visit in Ramadan?',
        a: 'Evening and night, because the park is officially described as opening in the evening and because the city\'s activity in Ramadan centres on after iftar.'
      },
      {
        q: 'Are the times the same every year?',
        a: 'No. Seasonal events and lines are announced for a specific season and then change, so the current year\'s announcement is checked before planning.'
      },
      {
        q: 'How many Ramadan transport lines run to the Prophet\'s Mosque?',
        a: 'The authority mentions eight Ramadan lines to the Prophet\'s Mosque, including one departing from the "park" stop, running from about 3 p.m. until one hour after Taraweeh.'
      },
      {
        q: 'What are the main Ramadan transport hubs?',
        a: 'Three main hubs are given: the Sports Stadium, Shazah and the park. Choose the one closest to your accommodation, and the lines depart from there to the Prophet\'s Mosque.'
      },
      {
        q: 'What did the Eid celebration at the park include?',
        a: 'According to the municipality, it included a children\'s area, handicraft and handmade-goods stalls and a food area. It is a seasonal model, not a fixed annual programme.'
      },
      {
        q: 'How many trips ran during the Ramadan season?',
        a: 'The authority mentions more than 13,000 transport trips during the season, an indicator of traffic volume rather than fixed timetables that repeat every year.'
      }
    ]
  }
};
