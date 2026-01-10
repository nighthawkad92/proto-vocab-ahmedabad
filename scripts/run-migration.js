#!/usr/bin/env node

/**
 * Database Migration Helper
 * Displays migration SQL for manual execution in Supabase SQL Editor
 */

const fs = require('fs')
const path = require('path')

// Get migration file from command line argument
const migrationFile = process.argv[2]

if (!migrationFile) {
  console.error('\n❌ Usage: node scripts/run-migration.js <migration-file>')
  console.error('Example: node scripts/run-migration.js 001-add-level-columns.sql\n')
  process.exit(1)
}

const migrationPath = path.join(__dirname, '../migrations', migrationFile)

if (!fs.existsSync(migrationPath)) {
  console.error(`\n❌ Migration file not found: ${migrationFile}\n`)
  process.exit(1)
}

console.log(`\n${'='.repeat(80)}`)
console.log(`📄 MIGRATION: ${migrationFile}`)
console.log('='.repeat(80))

const sql = fs.readFileSync(migrationPath, 'utf8')

console.log(sql)

console.log('='.repeat(80))
console.log('\n📋 INSTRUCTIONS:')
console.log('   1. Go to: https://supabase.com/dashboard/project/sguffpxuaahivvponwfb/sql')
console.log('   2. Click "New Query"')
console.log('   3. Copy the SQL content shown above')
console.log('   4. Paste it into the SQL Editor')
console.log('   5. Click "Run" (or press Cmd/Ctrl+Enter)')
console.log('   6. Verify you see the success message ✅')
console.log('\n💡 After running the migration, return here and type "done" to continue.\n')
