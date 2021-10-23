package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"

	"github.com/jphacks/F_2111/config"
)

func NewDB() (db *sqlx.DB, err error) {
	db, err = sqlx.Open("mysql", config.DSN())
	if err != nil {
		err = fmt.Errorf("failed to open connection: %w", err)
		return
	}

	var sqlDB *sql.DB
	sqlDB = db.DB
	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	sqlDB.SetMaxIdleConns(100)
	// SetMaxOpenConns sets the maximum number of open connections to the database.
	sqlDB.SetMaxOpenConns(100)

	if err = sqlDB.Ping(); err != nil {
		err = fmt.Errorf("failed to ping: %w", err)
		return
	}
	return
}
