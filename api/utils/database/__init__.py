from typing import AsyncGenerator, Generator
from sqlalchemy import text, Row, Sequence
from sqlalchemy.ext.asyncio import AsyncConnection, AsyncEngine
import os
from .engine import new_async_engine
from .create_db import create_database, Backup



engine: AsyncEngine = new_async_engine()
create_database()

class sql:    
    @staticmethod
    async def connect_db() -> AsyncGenerator[AsyncConnection, None]:
        con = await engine.connect()
        trans = await con.begin()  # explizite Transaktion starten
        try:
            yield con
            await trans.commit()
        except Exception:
            await trans.rollback()
            raise
        finally:
            await con.close()

    @staticmethod
    def __serialize_value(value):
        """Covert bytes in hex-digits"""
        if isinstance(value, bytes):
            return value.hex()
        return value

    @staticmethod
    def __process_row(row: Row, as_dict: bool = True):
        """helper-function for dict or tuple."""
        if as_dict:
            return {k: sql.__serialize_value(v) for k, v in row._mapping.items()}
        else:
            return tuple(row)

    @staticmethod
    def to_dict(data: Row | Sequence[Row])->dict | list[dict]:
        if isinstance(data, Row):
            return sql.__process_row(data, as_dict=True)
        else:
            return [sql.__process_row(row, as_dict=True) for row in data]

    @staticmethod
    def to_tuple(data: Row | Sequence[Row])->tuple | list[tuple]:
        if isinstance(data, Row):
            return sql._process_row(data, as_dict=False)
        else:
            return [sql.__process_row(row, as_dict=False) for row in data]
    
    type Connection = AsyncConnection
    text = text
    Backup = Backup


