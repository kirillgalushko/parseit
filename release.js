import fs from 'fs'
import { execSync } from 'child_process'
import inquirer from 'inquirer'

function incrementVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number)

  switch (type) {
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'major':
      return `${major + 1}.0.0`
    default:
      throw new Error('Unknown version type')
  }
}

function updatePackageJsonVersion(newVersion) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  packageJson.version = newVersion
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
}

function runCommand(command) {
  execSync(command, { stdio: 'inherit' })
}

function commitAndTag(newVersion) {
  console.log('Committing changes...')
  runCommand('git add .')
  runCommand(`git commit -m "Release ${newVersion}"`)

  console.log('Creating tag...')
  runCommand(`git tag -a v${newVersion} -m "Release ${newVersion}"`)
}

async function promptReleaseType() {
  const { releaseType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'releaseType',
      message: 'Select the type of version bump:',
      choices: ['patch', 'minor', 'major']
    }
  ])
  return releaseType
}

async function promptPushConfirmation() {
  const { shouldPush } = await inquirer.prompt([
    {
      type: 'list',
      name: 'shouldPush',
      message: 'Do you want to push changes to git?',
      choices: ['No', 'Yes']
    }
  ])
  return shouldPush === 'Yes'
}

async function main() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const currentVersion = packageJson.version

  console.log(`Current version: ${currentVersion}`)
  const releaseType = await promptReleaseType()
  const newVersion = incrementVersion(currentVersion, releaseType)

  updatePackageJsonVersion(newVersion)
  runCommand('npm install')
  commitAndTag(newVersion)

  if (await promptPushConfirmation()) {
    console.log('Pushing changes and tags to remote...')
    runCommand('git push origin main')
    runCommand(`git push origin v${newVersion}`)
  }

  console.log(`New version ${newVersion} committed and tagged successfully.`)
}

main().catch((error) => {
  console.error('An error occurred:', error)
})
