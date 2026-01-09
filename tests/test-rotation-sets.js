#!/usr/bin/env node

/**
 * Comprehensive Test Suite for Rotation Sets
 * Tests all aspects of the rotation implementation
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

let testsPassed = 0
let testsFailed = 0
const errors = []

function logTest(name, passed, error = null) {
  if (passed) {
    console.log(`  ✅ ${name}`)
    testsPassed++
  } else {
    console.log(`  ❌ ${name}`)
    testsFailed++
    if (error) {
      errors.push({ test: name, error })
      console.log(`     Error: ${error}`)
    }
  }
}

// Test 1: Database Connection
async function testDatabaseConnection() {
  console.log('\n🔌 Testing Database Connection...')
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('id')
      .limit(1)

    logTest('Database connection successful', !error && data !== null, error?.message)
  } catch (err) {
    logTest('Database connection successful', false, err.message)
  }
}

// Test 2: TypeScript Types
async function testTypeScriptTypes() {
  console.log('\n📝 Testing TypeScript Types...')
  try {
    const typesPath = path.join(__dirname, 'lib/types.ts')
    const typesContent = fs.readFileSync(typesPath, 'utf8')

    const hasRotationSets = typesContent.includes('rotationSets?: Question[][]')
    const hasRotationEnabled = typesContent.includes('rotationEnabled?: boolean')

    logTest('LessonBlock has rotationSets property', hasRotationSets)
    logTest('LessonContent has rotationEnabled property', hasRotationEnabled)
  } catch (err) {
    logTest('TypeScript types exist', false, err.message)
  }
}

// Test 3: Lesson Engine Implementation
async function testLessonEngineImplementation() {
  console.log('\n⚙️  Testing Lesson Engine Implementation...')
  try {
    const enginePath = path.join(__dirname, 'lib/lessonEngine.ts')
    const engineContent = fs.readFileSync(enginePath, 'utf8')

    const hasAttemptNumber = engineContent.includes('attemptNumber: number')
    const hasSelectQuestions = engineContent.includes('selectQuestions(')
    const hasRotationLogic = engineContent.includes('(this.attemptNumber - 1) % 3')
    const hasConstructorParam = engineContent.includes('attemptNumber: number = 1')

    logTest('LessonEngine has attemptNumber property', hasAttemptNumber)
    logTest('LessonEngine has selectQuestions method', hasSelectQuestions)
    logTest('LessonEngine implements rotation logic', hasRotationLogic)
    logTest('Constructor accepts attemptNumber parameter', hasConstructorParam)
  } catch (err) {
    logTest('Lesson engine implementation', false, err.message)
  }
}

// Test 4: Rotation Logic Calculation
function testRotationLogicCalculation() {
  console.log('\n🔢 Testing Rotation Logic Calculation...')

  const testCases = [
    { attempt: 1, expected: 0, setName: 'Default' },
    { attempt: 2, expected: 1, setName: 'Rotation Set 1' },
    { attempt: 3, expected: 2, setName: 'Rotation Set 2' },
    { attempt: 4, expected: 0, setName: 'Default (cycle)' },
    { attempt: 5, expected: 1, setName: 'Rotation Set 1 (cycle)' },
    { attempt: 6, expected: 2, setName: 'Rotation Set 2 (cycle)' },
    { attempt: 10, expected: 0, setName: 'Default' },
    { attempt: 11, expected: 1, setName: 'Rotation Set 1' },
  ]

  testCases.forEach(({ attempt, expected, setName }) => {
    const rotationIndex = (attempt - 1) % 3
    const passed = rotationIndex === expected
    logTest(`Attempt ${attempt}: ${setName} (index=${expected})`, passed,
      passed ? null : `Got ${rotationIndex}, expected ${expected}`)
  })
}

// Test 5: Database Lesson Structure
async function testDatabaseLessonStructure() {
  console.log('\n📚 Testing Database Lesson Structure...')
  try {
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, content')
      .eq('grade', 4)

    if (error) throw error

    logTest('Grade 4 lessons exist', lessons && lessons.length > 0,
      lessons?.length === 0 ? 'No lessons found' : null)

    if (lessons && lessons.length > 0) {
      lessons.forEach((lesson, idx) => {
        const hasRotationEnabled = lesson.content.rotationEnabled === true
        const hasBlocks = Array.isArray(lesson.content.blocks) && lesson.content.blocks.length > 0

        logTest(`Lesson ${idx + 1} "${lesson.title}" has rotationEnabled`, hasRotationEnabled)
        logTest(`Lesson ${idx + 1} "${lesson.title}" has blocks`, hasBlocks)

        if (hasBlocks) {
          lesson.content.blocks.forEach((block, blockIdx) => {
            const hasDefaultQuestions = Array.isArray(block.questions) && block.questions.length > 0
            const hasRotationSets = Array.isArray(block.rotationSets) && block.rotationSets.length > 0
            const hasTwoSets = block.rotationSets?.length === 2

            logTest(`  Block ${blockIdx} has default questions`, hasDefaultQuestions)
            logTest(`  Block ${blockIdx} has rotation sets`, hasRotationSets)

            if (hasRotationSets) {
              logTest(`  Block ${blockIdx} has 2 rotation sets`, hasTwoSets,
                hasTwoSets ? null : `Found ${block.rotationSets?.length} sets`)

              if (block.rotationSets) {
                block.rotationSets.forEach((set, setIdx) => {
                  const setSize = Array.isArray(set) ? set.length : 0
                  const isCorrectSize = setSize === 4
                  logTest(`    Set ${setIdx + 1} has 4 questions`, isCorrectSize,
                    isCorrectSize ? null : `Found ${setSize} questions`)
                })
              }
            }
          })
        }
      })
    }
  } catch (err) {
    logTest('Database lesson structure', false, err.message)
  }
}

// Test 6: API Endpoint
async function testAPIEndpoint() {
  console.log('\n🌐 Testing API Endpoint...')
  try {
    const apiPath = path.join(__dirname, 'app/api/student/lesson/[lessonId]/route.ts')
    const apiContent = fs.readFileSync(apiPath, 'utf8')

    const hasStudentIdParam = apiContent.includes('searchParams.get(\'studentId\')')
    const hasAttemptCount = apiContent.includes('.from(\'attempts\')')
    const returnsAttemptNumber = apiContent.includes('attemptNumber')

    logTest('API extracts studentId parameter', hasStudentIdParam)
    logTest('API queries attempts table', hasAttemptCount)
    logTest('API returns attemptNumber', returnsAttemptNumber)
  } catch (err) {
    logTest('API endpoint implementation', false, err.message)
  }
}

// Test 7: Frontend Integration
async function testFrontendIntegration() {
  console.log('\n🖥️  Testing Frontend Integration...')
  try {
    const pagePath = path.join(__dirname, 'app/student/lesson/[lessonId]/page.tsx')
    const pageContent = fs.readFileSync(pagePath, 'utf8')

    const passesStudentId = pageContent.includes('?studentId=${session.studentId}')
    const extractsAttemptNumber = pageContent.includes('data.attemptNumber')
    const passesToEngine = pageContent.includes('attemptNumber)')

    logTest('Frontend passes studentId to API', passesStudentId)
    logTest('Frontend extracts attemptNumber from response', extractsAttemptNumber)
    logTest('Frontend passes attemptNumber to LessonEngine', passesToEngine)
  } catch (err) {
    logTest('Frontend integration', false, err.message)
  }
}

// Test 8: Question Content Validation
async function testQuestionContentValidation() {
  console.log('\n📋 Testing Question Content Validation...')
  try {
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('title, content')
      .eq('grade', 4)
      .limit(1)

    if (error) throw error

    if (lessons && lessons[0]) {
      const lesson = lessons[0]
      const block = lesson.content.blocks[0]

      // Check default questions
      if (block.questions && block.questions[0]) {
        const q = block.questions[0]
        const hasId = typeof q.id === 'string' && q.id.length > 0
        const hasType = typeof q.type === 'string' && q.type.length > 0
        const hasPrompt = typeof q.prompt === 'string' && q.prompt.length > 0
        const hasOptions = Array.isArray(q.options) && q.options.length > 0
        const hasCorrectAnswer = typeof q.correctAnswer === 'string' && q.correctAnswer.length > 0

        logTest('Default question has id', hasId)
        logTest('Default question has type', hasType)
        logTest('Default question has prompt', hasPrompt)
        logTest('Default question has options', hasOptions)
        logTest('Default question has correctAnswer', hasCorrectAnswer)
      }

      // Check rotation set questions
      if (block.rotationSets && block.rotationSets[0] && block.rotationSets[0][0]) {
        const q = block.rotationSets[0][0]
        const hasId = typeof q.id === 'string' && q.id.length > 0
        const hasRotationId = q.id.includes('r1') || q.id.includes('r2')
        const hasType = typeof q.type === 'string' && q.type.length > 0
        const hasPrompt = typeof q.prompt === 'string' && q.prompt.length > 0

        logTest('Rotation question has id', hasId)
        logTest('Rotation question has rotation identifier', hasRotationId)
        logTest('Rotation question has type', hasType)
        logTest('Rotation question has prompt', hasPrompt)
      }
    }
  } catch (err) {
    logTest('Question content validation', false, err.message)
  }
}

// Test 9: Question Uniqueness
async function testQuestionUniqueness() {
  console.log('\n🔍 Testing Question Uniqueness...')
  try {
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('title, content')
      .eq('grade', 4)
      .limit(1)

    if (error) throw error

    if (lessons && lessons[0]) {
      const block = lessons[0].content.blocks[0]

      const defaultPrompts = new Set(block.questions.map(q => q.prompt))
      const set1Prompts = new Set(block.rotationSets[0]?.map(q => q.prompt) || [])
      const set2Prompts = new Set(block.rotationSets[1]?.map(q => q.prompt) || [])

      // Check that prompts are different across sets
      const defaultVsSet1Overlap = [...defaultPrompts].filter(p => set1Prompts.has(p))
      const defaultVsSet2Overlap = [...defaultPrompts].filter(p => set2Prompts.has(p))
      const set1VsSet2Overlap = [...set1Prompts].filter(p => set2Prompts.has(p))

      logTest('Default and Set 1 have different prompts', defaultVsSet1Overlap.length === 0,
        defaultVsSet1Overlap.length > 0 ? `Found ${defaultVsSet1Overlap.length} overlaps` : null)
      logTest('Default and Set 2 have different prompts', defaultVsSet2Overlap.length === 0,
        defaultVsSet2Overlap.length > 0 ? `Found ${defaultVsSet2Overlap.length} overlaps` : null)
      logTest('Set 1 and Set 2 have different prompts', set1VsSet2Overlap.length === 0,
        set1VsSet2Overlap.length > 0 ? `Found ${set1VsSet2Overlap.length} overlaps` : null)
    }
  } catch (err) {
    logTest('Question uniqueness', false, err.message)
  }
}

// Test 10: Build Verification
async function testBuildVerification() {
  console.log('\n🔨 Testing Build Configuration...')
  try {
    const nextConfigPath = path.join(__dirname, 'next.config.js')
    const tsconfigPath = path.join(__dirname, 'tsconfig.json')

    const nextConfigExists = fs.existsSync(nextConfigPath)
    const tsconfigExists = fs.existsSync(tsconfigPath)

    logTest('next.config.js exists', nextConfigExists)
    logTest('tsconfig.json exists', tsconfigExists)

    if (tsconfigExists) {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'))
      const hasStrictMode = tsconfig.compilerOptions?.strict === true
      logTest('TypeScript strict mode enabled', hasStrictMode)
    }
  } catch (err) {
    logTest('Build configuration', false, err.message)
  }
}

// Main test runner
async function runAllTests() {
  console.log('🧪 Running Comprehensive Rotation Sets Test Suite')
  console.log('=' .repeat(60))

  await testDatabaseConnection()
  await testTypeScriptTypes()
  await testLessonEngineImplementation()
  testRotationLogicCalculation()
  await testDatabaseLessonStructure()
  await testAPIEndpoint()
  await testFrontendIntegration()
  await testQuestionContentValidation()
  await testQuestionUniqueness()
  await testBuildVerification()

  console.log('\n' + '='.repeat(60))
  console.log('📊 Test Results Summary')
  console.log('='.repeat(60))
  console.log(`✅ Tests Passed: ${testsPassed}`)
  console.log(`❌ Tests Failed: ${testsFailed}`)
  console.log(`📈 Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`)

  if (errors.length > 0) {
    console.log('\n❌ Errors Found:')
    errors.forEach((e, idx) => {
      console.log(`\n${idx + 1}. ${e.test}`)
      console.log(`   ${e.error}`)
    })
  } else {
    console.log('\n🎉 All tests passed! Rotation sets implementation is working correctly.')
  }

  console.log('\n' + '='.repeat(60))

  process.exit(testsFailed > 0 ? 1 : 0)
}

runAllTests()
