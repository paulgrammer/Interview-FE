**Code Readability**:
   - The code could benefit from better indentation for improved readability.
   - Remember to split complex logic in more granular elements in order to achieve better maintainability and readability. You should consider modularity. for example at line `15`, code could be extracted into a middleware since you the app appears to be express.js powered.
   - Name your variables so that they can be easily understood for better code comprehension. For instance, `idUser` may convert to `userId`.
   - Imply one naming convention across the entire codebase.

**Performance**:
   - At line `51`, consider optimizing performance, especially in loops where database calls or heavy computations are involved. For example, minimize the number of database calls inside loops if possible.
   - At line `22` and `55`, calling `crypto.createHash` can be memory-intensive, when used frequently in a loop. you should consider moving it outside the loop at line `55`.
   - At line `3` `logInfo('FILE=',req.file)` and `logDebug('FILE2=', file)` at line `31`, the whole file do not need to be loaded in memory just for logging purposes, and if you work with large files it may use more memory resources than necessary. You can prevent the storing of the entire file content and only log metadata.

**Error Handling**:
   - Don’t forget to cover all the possible error situations and include appropriate handling for them. Take, for example, handling of cases where functions `User.findOne(idUser)` at line `10` and `db.getDebtCollectors()` at line `40` could fail.

**Configuration Management**:
   - Make sure that values like the API endpoints are properly dealt with and not embedded in the code. For example from line `74-76` consider defining `https://url.go` in .env file as `FILE_SERVER=https://url.go` the later access it as `process.env.FILE_SERVER`

**Security**:
   - Be sure to properly deal with delicate information (user data) so it is not exposed during log and/or response. AT line `126` you exposed `Tomas'` email `tomas@upscore.no`.
   - Validate every user inputs correctly so that injection attacks or undesired behavior may not happen.

**Comments**:
   - Even though the code is mostly self-explanatory, nevertheless, providing comments for complex logic and the reasoning behind using functions and variables would definitely improve code understandability, in particular for the future maintainers.
