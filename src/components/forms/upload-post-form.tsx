import { Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '@/hooks/usePost';
import type { ICreatePostPayload } from '@/interfaces/post';
import { toast } from 'sonner';
import { GenerateAICaptionModal } from '../modals/generate-ai-caption-modal';

const uploadPostSchema = z.object({
    postImage: z
        .instanceof(File)
        .refine((file) => file.size > 0, {
            message: 'Image is required',
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'Image must be less than 5MB',
        })
        .refine(
            (file) => {
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                return allowedTypes.includes(file.type);
            },
            {
                message: 'Only JPEG, JPG, and PNG images are allowed',
            }
        ),

    postContent: z
        .string()
        .min(1, {
            message: 'Post content is required',
        })
        .max(500, {
            message: 'Post content must be less than 500 characters',
        })
        .refine(
            (content) => {
                return content.trim().length > 0;
            },
            {
                message: 'Post content cannot be empty',
            }
        ),
});

type UploadPostFormData = z.infer<typeof uploadPostSchema>;

export default function UploadPostForm() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
        trigger,
    } = useForm<UploadPostFormData>({
        resolver: zodResolver(uploadPostSchema),
        defaultValues: {
            postContent: '',
        },
    });

    const postContent = watch('postContent');
    const characterCount = postContent?.length || 0;
    const maxCharacters = 500;
    const characterWarning = characterCount > maxCharacters * 0.8;
    const characterError = characterCount > maxCharacters;

    const handleAIGenerate = (aiCaption: string) => {
        setValue('postContent', aiCaption);
        trigger('postContent');
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setValue('postImage', file);
            trigger('postImage');
        }
    };

    const createPost = useCreatePost();

    const onPublishPost = () => {
        const payload: ICreatePostPayload = {
            file: selectedImage,
            text: postContent,
        };

        createPost.mutate(payload, {
            onSuccess: (message) => {
                toast.success(message);
                setSelectedImage(null);
                setValue('postContent', '');
            },
            onError: () => {
                toast.error('failed publishing post');
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Create New Post</span>
                </CardTitle>
                <CardDescription>
                    Share updates with your supporters
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onPublishPost)}>
                    {/* Image Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground">
                            Upload Image
                        </label>

                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />

                            {/* Conditional preview or upload UI */}
                            {selectedImage ? (
                                <div className="relative inline-block w-full">
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer block relative group">
                                        <img
                                            src={URL.createObjectURL(
                                                selectedImage
                                            )}
                                            alt="Preview"
                                            className="max-h-64 mx-auto rounded-md object-contain w-full"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                            <span className="text-white text-sm font-medium">
                                                Click to change image
                                            </span>
                                        </div>
                                    </label>

                                    {/* Clear button */}
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-7 w-7 rounded-full shadow-md"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(null);
                                            setValue(
                                                'postImage',
                                                undefined as any
                                            );
                                        }}>
                                        <X />
                                    </Button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer flex flex-col items-center space-y-2">
                                    <Upload className="w-8 h-8 text-muted-foreground" />
                                    <div>
                                        <span className="text-sm font-medium text-primary">
                                            Click to upload
                                        </span>
                                        <p className="text-xs text-muted-foreground">
                                            PNG, JPG, JPEG up to 5MB
                                        </p>
                                    </div>
                                </label>
                            )}
                        </div>

                        {/* Error message */}
                        {errors.postImage && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.postImage.message}
                            </p>
                        )}
                    </div>

                    {/* Caption Input with AI Helper */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between mt-5">
                            <label className="text-sm font-medium text-foreground">
                                Post Caption
                            </label>
                            <GenerateAICaptionModal
                                handleChange={handleAIGenerate}
                            />
                        </div>
                        <Textarea
                            placeholder="Share what's on your mind... or let AI help you write an engaging caption!"
                            value={postContent}
                            onChange={(e) => {
                                setValue('postContent', e.target.value);
                                if (e.target.value.length > 0) {
                                    trigger('postContent');
                                }
                            }}
                            className="min-h-[120px] resize-none"
                        />

                        {/* Character Counter dengan styling conditional */}
                        <div className="flex justify-between items-center">
                            <div className="text-xs text-muted-foreground">
                                Minimum 1 character required
                            </div>
                            <div
                                className={`text-xs ${
                                    characterError
                                        ? 'text-red-500 font-semibold'
                                        : characterWarning
                                        ? 'text-amber-500'
                                        : 'text-muted-foreground'
                                }`}>
                                {characterCount}/{maxCharacters}
                                {characterError && (
                                    <span className="ml-1">
                                        • Exceeded limit
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Error messages untuk post content */}
                        {errors.postContent && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.postContent.message}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={createPost.isPending || !isValid}>
                            {createPost.isPending
                                ? 'Publishing Post...'
                                : 'Publish Post'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
