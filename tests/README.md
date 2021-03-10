# Tests

## API tests
API tests can be defined to test whether an API call exists and to test the return value. See APIcalls.test.js for reference.

## UI tests
UI tests use something called snapshot testing where the UI is rendered to a file, called a snapshot, then every time the test is run, the output is compared to the snapshot.
This isn't fully working right now because it just compares to null. See Profile.test.js and \_\_snapshots\_\_/Profile.test.js.snap for reference.
