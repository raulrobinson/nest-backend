import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo', description: 'Create a new todo entry' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Todo successfully created' })
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      const searchDataByTitle = await this.todosService.findOneByTitle(createTodoDto.title);
      if (searchDataByTitle) {
        return {
          success: false,
          message: 'Todo already exists',
          data: null,
        };
      } else {
        const responseData = await this.todosService.create(createTodoDto);
        return {
          success: true,
          message: 'Todo created successfully',
          data: responseData,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error creating todo',
        error: error,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos', description: 'Get a list of all todos' })
  @ApiResponse({ status: 200, description: 'List of todos successfully retrieved' })
  @ApiResponse({ status: 201, description: 'Todos not content' })
  async findAll() {
    try {
      const responseData = await this.todosService.findAll();
      return {
        success: true,
        message: 'Todos fetched successfully',
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching todos',
        error: error,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by ID', description: 'Get a single todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiResponse({ status: 200, description: 'Todo successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async findOne(@Param('id') id: string) {
    try {
      const responseData = await this.todosService.findOne(+id);
      if (responseData) {
        return {
          success: true,
          message: 'Todo fetched successfully',
          data: responseData,
        };
      } else {
        return {
          success: false,
          message: 'Todo not found',
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching todo',
        error: error,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID', description: 'Update an existing todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Todo successfully updated' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      const searchDataById = await this.todosService.findOne(+id);
      if (!searchDataById) {
        return {
          success: false,
          message: 'Todo not found',
          data: null,
        };
      } else {
        const responseData = await this.todosService.update(+id, updateTodoDto);
        return {
          success: true,
          message: 'Todo updated successfully',
          data: [{
            'affected' : responseData.affected,
          }]
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error updating todo',
        error: error,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID', description: 'Delete an existing todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiResponse({ status: 200, description: 'Todo successfully deleted' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async remove(@Param('id') id: string) {
    try {
      const searchDataById = await this.todosService.findOne(+id);
      if (!searchDataById) {
        return {
          success: false,
          message: 'Todo not found',
          data: null,
        };
      } else {
        const responseData = await this.todosService.remove(+id);
        return {
          success: true,
          message: 'Todo deleted successfully',
          data: responseData,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error deleting todo',
        error: error,
      };
    }
  }
}
