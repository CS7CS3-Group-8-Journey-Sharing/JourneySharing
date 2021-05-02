import * as utils from "../utils/utilFunctions";

test("Assert getCurrentJourneys exists", () => {
    expect(utils.getCurrentJourneys).toBeDefined();
});

test("Assert getOwnersJourneys exists", () => {
    expect(utils.getOwnersJourneys).toBeDefined();
});

test("Assert parseJwt exists", () => {
    expect(utils.parseJwt).toBeDefined();
});

test("Assert parseISOString exists", () => {
    expect(utils.parseISOString).toBeDefined();
});
test("parseISOStrign", () => {
    const parsedDate = utils.parseISOString("2021-01-01T00:00:00.000Z")
    // month is an index starting at 0? lol
    const date = new Date(2021, 0, 1, 0, 0, 0, 0);
    expect(parsedDate).toEqual(date);
});

test("Assert isoFormatDMY exists", () => {
    expect(utils.isoFormatDMY).toBeDefined();
});
test("isoFormatDMY", () => {
    const date = new Date(2021, 0, 1, 0, 0, 0, 0);
    const parsedDmy = utils.isoFormatDMY(date);
    const dmy = "01/01/2021";
    expect(parsedDmy).toEqual(dmy);
});

test("Assert isoFormatHMS exists", () => {
    expect(utils.isoFormatHMS).toBeDefined();
});
test("isoFormatHMS", () => {
    const date = new Date(2021, 0, 1, 12, 10, 5, 0);
    const parsedHm = utils.isoFormatHMS(date)
    const hm = "12:10";
    expect(parsedHm).toEqual(hm);
});
