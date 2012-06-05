# hStressTool
A simple stress tool for the Hubiquitus Framework using nodeJS.

## How to Use

Simply Launch `stress.js` by passing the two mandatory parameters: username
and password.

```
$ node stress --username=<username> --password=<password>
```

They are the login and password accepted by XMPP that will be used
to establish the connections.

The sessions quantity, interval to launch them and others
can be also specified as parameters. For a full list of options
run

```
$ node stress --help
```

## License
Copyright (c) Novedia Group 2012.

This file is part of Hubiquitus.

Hubiquitus is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Hubiquitus is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Hubiquitus.  If not, see <http://www.gnu.org/licenses/>.
