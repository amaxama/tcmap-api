const airtableMock = require('airtable')
const airtableClientMock = require('../airtableClient')
const cacheServiceMock = require('./cacheService')
const siteService = require('./siteService')

jest.mock('airtable')
jest.mock('../airtableClient')
jest.mock('./cacheService')


const expectedResult = [{ name: "10k Hoodies- Bloomington", neighborhood: ["South Suburbs"], address: "7843 Portland Ave S, Bloomington, MN 55420\n", longitude: -93.267299, latitude: 44.860555, mostRecentlyUpdatedAt: "2021-01-30T02:24:17.000Z", currentlyOpenForDistributing: "no", openingForDistributingDonations: "never", closingForDistributingDonations: undefined, currentlyOpenForReceiving: "yes", openingForReceivingDonations: "9:00 am", closingForReceivingDonations: "5:00 pm", urgentNeed: undefined, seekingMoney: undefined, seekingMoneyURL: undefined, noIdNeeded: undefined, someInfoRequired: undefined, warmingSite: undefined, publicTransitOptions: undefined, accepting: "(as of 12/24 10:20am) Hoodies, new and packaged personal hygiene products. If you are able, please attach a small and encouraging handwritten note to the hoodie that you are donating.", notAccepting: undefined, seekingVolunteers: "no", notes: "(as of 12/24 10:20am)\nBring a hoodie to Pilgrims Dry Cleaners \nMonday - Friday 7am - 7pm \nSaturday 9am - 5pm\nSunday 10am - 5pm\n\nYou can also ship a hoodie to\nATTN:\nBrandon Glova\nPO\nBox 8112\nMinneapolis,\nMN 55408-3103 \n\nYou may also support 10khoodies by purchasing a hoodie at https://highlovelife.com/pages/10khoodies\n\nOne year ago, DJ Bonics started a mission to turn Minnesota from the land of 10,000 Lakes to the Land of 10,000 Hoodies. The year 2020 has been met with many challenges and opportunities to grow. This project serves as a reminder that we all have something to give. By donating a sweatshirt, you are providing someone in your community with warmth and comfort that lasts beyond a Minnesota winter.", color: "#fc03df" }, 
        { name: "10k Hoodies- Brooklyn Park", neighborhood: ["North Suburbs"], address: "3217 85th Ave N, Brooklyn Park, MN 55443\n", longitude: -93.3232077, latitude: 45.1083272, mostRecentlyUpdatedAt: "2021-01-30T02:24:24.000Z", currentlyOpenForDistributing: "no", openingForDistributingDonations: "never", closingForDistributingDonations: undefined, currentlyOpenForReceiving: "yes", openingForReceivingDonations: "9:00 am", closingForReceivingDonations: "3:00 pm", urgentNeed: undefined, seekingMoney: undefined, seekingMoneyURL: undefined, noIdNeeded: undefined, someInfoRequired: undefined, warmingSite: undefined, seekingVolunteers: undefined, publicTransitOptions: [{ routeName: "89", backgroundColor: "#771473", icon: "directions_bus", distance: "(3 blocks)", altText: "89 bus, (3 blocks) away" }, { routeName: "Blue", backgroundColor: "#0055A5", icon: "tram", distance: "(2 blocks)", altText: "BLUELINE light rail, (2 blocks) away" }, { routeName: "Green", backgroundColor: "#00B100", icon: "tram", distance: "(4 blocks)", altText: "GREENLINE light rail, (4 blocks) away" }], accepting: "(as of 12/24 10:20am) Hoodies, new and packaged personal hygiene products. If you are able, please attach a small and encouraging handwritten note to the hoodie that you are donating.", notAccepting: undefined, notes: "(as of 12/24 10:20am)\nBring a hoodie to Pilgrims Dry Cleaners \nMonday - Friday 7am - 6pm\nSaturday 9am - 3pm\n\nYou can also ship a hoodie to\n \nATTN:\nBrandon Glova\nPO\nBox 8112\nMinneapolis,\nMN 55408-3103 \n\nYou may also support 10khoodies by purchasing a hoodie at https://highlovelife.com/pages/10khoodies \n\nOne year ago, DJ Bonics started a mission to turn Minnesota from the land of 10,000 Lakes to the Land of 10,000 Hoodies. The year 2020 has been met with many challenges and opportunities to grow. This project serves as a reminder that we all have something to give. By donating a sweatshirt, you are providing someone in your community with warmth and comfort that lasts beyond a Minnesota winter. ", color: "#fc03df" }]





describe("getMutualAidSites", () => {
    afterEach(() => jest.resetAllMocks());

    it('should return all properties accurately mapped', async () => {
        const airtableResponse = [
            {
                "id": "rec3ZZou1xGF2QjtS",
                "fields": {
                    "org_name": "10k Hoodies- Bloomington",
                    "neighborhood": [
                        "recqslgpa4HLlG0t7"
                    ],
                    "address": "7843 Portland Ave S, Bloomington, MN 55420\n",
                    "latitude": 44.860555,
                    "longitude": -93.267299,
                    "opening_for_receiving": "0900",
                    "closing_for_receiving": "1700",
                    "opening_for_distributing": "never",
                    "accepting": "(as of 12/24 10:20am) Hoodies, new and packaged personal hygiene products. If you are able, please attach a small and encouraging handwritten note to the hoodie that you are donating.",
                    "seeking_volunteers": "no",
                    "notes": "(as of 12/24 10:20am)\nBring a hoodie to Pilgrims Dry Cleaners \nMonday - Friday 7am - 7pm \nSaturday 9am - 5pm\nSunday 10am - 5pm\n\nYou can also ship a hoodie to\nATTN:\nBrandon Glova\nPO\nBox 8112\nMinneapolis,\nMN 55408-3103 \n\nYou may also support 10khoodies by purchasing a hoodie at https://highlovelife.com/pages/10khoodies\n\nOne year ago, DJ Bonics started a mission to turn Minnesota from the land of 10,000 Lakes to the Land of 10,000 Hoodies. The year 2020 has been met with many challenges and opportunities to grow. This project serves as a reminder that we all have something to give. By donating a sweatshirt, you are providing someone in your community with warmth and comfort that lasts beyond a Minnesota winter.",
                    "internal_notes (please initial)": "(as of 12/24 10:20am) updated based on link -sk\n(12/7) Updated broken link, added details from the website. -DR\n(12/5 9pm) IG message from Libby- CC\n",
                    "INTERNAL ONLY: Contact/info source (facebook group, penguin, DM, email, text, etc)": "\n",
                    "receives": true,
                    "hours": "Monday - Friday 7am - 7pm \nSaturday 9am - 5pm\nSunday 10am - 5pm\n",
                    "notes_abridged": "Bring a hoodie to Pilgrims Dry Cleaners during hours listed above.\n\nYou can also ship a hoodie to\nATTN:\nBrandon Glova\nPO\nBox 8112\nMinneapolis,\nMN 5540...",
                    "currently_open_for_receiving": "yes",
                    "currently_open_for_distributing": "no",
                    "color": "#fc03df",
                    "last_updated": "2021-01-30T02:24:17.000Z",
                    "neighborhood_name": [
                        "South Suburbs"
                    ],
                    "notes_last_updated": "2021-01-26T07:03:28.000Z",
                    "notes_concatenated": "(as of 2021-01-26T07:03:28.000Z ) \n\nHours:\nMonday - Friday 7am - 7pm \nSaturday 9am - 5pm\nSunday 10am - 5pm\n\n\nBring a hoodie to Pilgrims Dry Cleaners d...",
                    "status": "✅"
                },
                "createdTime": "2020-10-25T00:11:30.000Z"
            },
            {
                "id": "recmrNSxIOPHYjtYY",
                "fields": {
                    "org_name": "10k Hoodies- Brooklyn Park",
                    "neighborhood": [
                        "recelerSBQ0IhXOYc"
                    ],
                    "address": "3217 85th Ave N, Brooklyn Park, MN 55443\n",
                    "latitude": 45.1083272,
                    "longitude": -93.3232077,
                    "opening_for_receiving": "0900",
                    "closing_for_receiving": "1500",
                    "opening_for_distributing": "never",
                    "accepting": "(as of 12/24 10:20am) Hoodies, new and packaged personal hygiene products. If you are able, please attach a small and encouraging handwritten note to the hoodie that you are donating.",
                    "notes": "(as of 12/24 10:20am)\nBring a hoodie to Pilgrims Dry Cleaners \nMonday - Friday 7am - 6pm\nSaturday 9am - 3pm\n\nYou can also ship a hoodie to\n \nATTN:\nBrandon Glova\nPO\nBox 8112\nMinneapolis,\nMN 55408-3103 \n\nYou may also support 10khoodies by purchasing a hoodie at https://highlovelife.com/pages/10khoodies \n\nOne year ago, DJ Bonics started a mission to turn Minnesota from the land of 10,000 Lakes to the Land of 10,000 Hoodies. The year 2020 has been met with many challenges and opportunities to grow. This project serves as a reminder that we all have something to give. By donating a sweatshirt, you are providing someone in your community with warmth and comfort that lasts beyond a Minnesota winter. ",
                    "internal_notes (please initial)": "(as of 12/24 10:20am) updated based on link -sk\n(12/7) Updated broken link, added details from the website. -DR\n(12/5 9pm) IG message from Libby- CC\n",
                    "INTERNAL ONLY: Contact/info source (facebook group, penguin, DM, email, text, etc)": "\n",
                    "receives": true,
                    "public_transit": [
                        "89-BUS-(3 blocks)",
                        "Blue-BLUELINE-(2 blocks)",
                        "Green-GREENLINE-(4 blocks)"
                    ],
                    "hours": "Monday - Friday 7am - 6pm\nSaturday 9am - 3pm",
                    "notes_abridged": "Bring a hoodie to Pilgrims Dry Cleaners during hours listed above.\n\nYou can also ship a hoodie to\n \nATTN:\nBrandon Glova\nPO\nBox 8112\nMinneapolis,\nMN 55...",
                    "currently_open_for_receiving": "yes",
                    "currently_open_for_distributing": "no",
                    "color": "#fc03df",
                    "last_updated": "2021-01-30T02:24:24.000Z",
                    "neighborhood_name": [
                        "North Suburbs"
                    ],
                    "notes_last_updated": "2021-01-26T07:05:21.000Z",
                    "notes_concatenated": "(as of 2021-01-26T07:05:21.000Z ) \n\nHours:\nMonday - Friday 7am - 6pm\nSaturday 9am - 3pm\n\nBring a hoodie to Pilgrims Dry Cleaners during hours listed a...",
                    "status": "✅"
                },
                "createdTime": "2020-10-25T00:11:30.000Z"
            },
        ]

        airtableClientMock.getMutualAidSites.mockResolvedValue(airtableResponse)

        let result = await siteService.getMutualAidSites("/v1/mutual_aid_sites")

        expect(airtableClientMock.getMutualAidSites).toHaveBeenCalled()
        expect(cacheServiceMock.writeCache).toHaveBeenCalled()

        expect(result).toStrictEqual(expectedResult)
    })

    it('should return cached result when airtableClient throws error', async () => {
        cacheServiceMock.readCache.mockResolvedValue(expectedResult)
        airtableClientMock.getMutualAidSites.mockResolvedValue(new Error("There was an error getting mutual aid sites: Error fetching Airtable records"))

        let result = await siteService.getMutualAidSites("/v1/mutual_aid_sites")

        expect(cacheServiceMock.readCache).toHaveBeenCalled()
        expect(result).toStrictEqual(expectedResult)
    })

    it('should return cached result when error thrown from within function', async () => {
        cacheServiceMock.readCache.mockResolvedValue(expectedResult)
        cacheServiceMock.writeCache.mockResolvedValue(new Error("There was an error mapping mutual aid sites, returning cached data. Error is: write to cache failed"))

        let result = await siteService.getMutualAidSites("/v1/mutual_aid_sites")

        expect(cacheServiceMock.readCache).toHaveBeenCalled()
        expect(result).toStrictEqual(expectedResult)
    })
})

describe("transformPublicTransit", () => {
    it('should return list of publicTransitOption objects', () => {
        let result = siteService.transformPublicTransit([ "89-BUS-(3 blocks)", "Blue-BLUELINE-(2 blocks)", "Green-GREENLINE-(4 blocks)" ])
        let expectedResult = [ { routeName: "89", backgroundColor: "#771473", icon: "directions_bus", distance: "(3 blocks)", altText: "89 bus, (3 blocks) away" }, { routeName: "Blue", backgroundColor: "#0055A5", icon: "tram", distance: "(2 blocks)", altText: "BLUELINE light rail, (2 blocks) away" }, { routeName: "Green", backgroundColor: "#00B100", icon: "tram", distance: "(4 blocks)", altText: "GREENLINE light rail, (4 blocks) away" } ]
        expect(result).toStrictEqual(expectedResult)
    })

    it('should ignore transit options with less than two hyphens', () => {
        let result = siteService.transformPublicTransit([ "89BUS(3 blocks)", "BlueBLUELINE-(2 blocks)", "Green-GREENLINE-(4 blocks)" ])
        expect(result.length).toBe(1)
    })

    it('should ignore transit options with invalid transit type', () => {
        let result = siteService.transformPublicTransit([ "89-BUSSES-(3 blocks)", "Blue-TRAIN-(2 blocks)", "Green-greenline-(4 blocks)" ])
        expect(result).toBe(undefined)
    })
})